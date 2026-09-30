import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TAB_READY_MESSAGE, TAB_STATE_PORT_NAME, type TabState } from "~/api/api.model";
import { watchActiveTabState, type TabView } from "./active-tab-state";

type Listener = (...args: any[]) => void;

function createEvent() {
    const listeners = new Set<Listener>();

    return {
        addListener: (listener: Listener) => listeners.add(listener),
        removeListener: (listener: Listener) => listeners.delete(listener),
        emit: (...args: any[]) => listeners.forEach(listener => listener(...args)),
    };
}

function createFakeBrowser() {
    type FakePort = ReturnType<typeof createPort>;
    type FakeTab = { state?: TabState; ports: Set<FakePort> };

    const tabs = new Map<number, FakeTab>();
    let activeTabId: number | undefined;

    const onActivated = createEvent();
    const onMessage = createEvent();
    const onUpdated = createEvent();
    const onRemoved = createEvent();

    function createPort(name: string) {
        const onPortMessage = createEvent();
        const onDisconnect = createEvent();
        const port = {
            name,
            onMessage: onPortMessage,
            onDisconnect,
            disconnect: () => [...tabs.values()].forEach(tab => tab.ports.delete(port)),
        };

        return port;
    }

    function disconnectFromUi(port: FakePort, lastError?: string) {
        chrome.runtime.lastError = lastError ? { message: lastError } : undefined;
        port.onDisconnect.emit(port);
        chrome.runtime.lastError = undefined;
    }

    const chrome = {
        runtime: {
            lastError: undefined as { message: string } | undefined,
            onMessage,
        },
        tabs: {
            onActivated,
            onUpdated,
            onRemoved,
            query: async () => (activeTabId === undefined ? [] : [{ id: activeTabId }]),
            connect: (tabId: number, { name }: { name: string }) => {
                const port = createPort(name);

                queueMicrotask(() => {
                    const tab = tabs.get(tabId);
                    if (!tab?.state || name !== TAB_STATE_PORT_NAME) {
                        disconnectFromUi(port, "Could not establish connection. Receiving end does not exist.");
                        return;
                    }

                    tab.ports.add(port);
                    port.onMessage.emit(tab.state, port);
                });

                return port;
            },
        },
    };

    return {
        chrome,
        openTab(tabId: number, state?: TabState) {
            tabs.set(tabId, { state, ports: new Set() });
        },
        activate(tabId: number) {
            activeTabId = tabId;
            onActivated.emit({ tabId, windowId: 1 });
        },
        publish(tabId: number, state: TabState) {
            const tab = tabs.get(tabId)!;
            tab.state = state;
            tab.ports.forEach(port => port.onMessage.emit(state, port));
        },
        startReload(tabId: number) {
            const tab = tabs.get(tabId)!;
            tab.state = undefined;
            tab.ports.forEach(port => disconnectFromUi(port));
            tab.ports.clear();
        },
        finishReload(tabId: number, state?: TabState) {
            onUpdated.emit(tabId, { status: "complete" });
            if (state) {
                tabs.get(tabId)!.state = state;
                onMessage.emit({ type: TAB_READY_MESSAGE }, { tab: { id: tabId } });
            }
        },
        close(tabId: number) {
            tabs.get(tabId)!.ports.forEach(port => disconnectFromUi(port));
            tabs.delete(tabId);
            onRemoved.emit(tabId);
        },
    };
}

function playing(title: string): TabState {
    return {
        currentPlayingSong: { isPending: false, data: { title, artist: "Artist" } },
        currentViewSongs: { isPending: false, data: [] },
    };
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

describe("watchActiveTabState", () => {
    let browser: ReturnType<typeof createFakeBrowser>;
    let view: TabView;
    let stop: () => void;

    beforeEach(() => {
        browser = createFakeBrowser();
        vi.stubGlobal("chrome", browser.chrome);
    });

    afterEach(() => {
        stop?.();
        vi.unstubAllGlobals();
    });

    const watch = () => {
        stop = watchActiveTabState(nextView => (view = nextView));
    };

    it("shows the active tab's state and its updates", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.activate(1);

        watch();
        expect(view).toEqual({ status: "connecting" });

        await flush();
        expect(view).toEqual({ status: "connected", state: playing("Hey Jude") });

        browser.publish(1, playing("Let It Be"));
        expect(view).toEqual({ status: "connected", state: playing("Let It Be") });
    });

    it("reports a missing content script when the active tab has none", async () => {
        browser.openTab(1);
        browser.activate(1);

        watch();
        await flush();

        expect(view).toEqual({ status: "no-content-script" });
    });

    it("follows the active tab across supported tabs", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.openTab(2, playing("Paranoid"));
        browser.activate(1);
        watch();
        await flush();

        browser.activate(2);
        await flush();

        expect(view).toEqual({ status: "connected", state: playing("Paranoid") });
    });

    it("keeps the last supported tab when switching to a tab without the content script", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.openTab(2);
        browser.activate(1);
        watch();
        await flush();

        browser.activate(2);
        await flush();
        expect(view).toEqual({ status: "connected", state: playing("Hey Jude") });

        browser.publish(1, playing("Let It Be"));
        expect(view).toEqual({ status: "connected", state: playing("Let It Be") });
    });

    it("ignores updates from tabs it is not connected to", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.openTab(2, playing("Paranoid"));
        browser.activate(1);
        watch();
        await flush();
        browser.activate(2);
        await flush();

        browser.publish(1, playing("Let It Be"));

        expect(view).toEqual({ status: "connected", state: playing("Paranoid") });
    });

    it("reconnects when the connected tab reloads", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.activate(1);
        watch();
        await flush();

        browser.startReload(1);
        await flush();
        browser.finishReload(1, playing("Let It Be"));
        await flush();

        expect(view).toEqual({ status: "connected", state: playing("Let It Be") });
    });

    it("connects once a tab opened before install is reloaded", async () => {
        browser.openTab(1);
        browser.activate(1);
        watch();
        await flush();

        browser.finishReload(1, playing("Hey Jude"));
        await flush();

        expect(view).toEqual({ status: "connected", state: playing("Hey Jude") });
    });

    it("stays connecting while the connected tab reloads", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.activate(1);
        watch();
        await flush();

        browser.startReload(1);
        await flush();

        expect(view).toEqual({ status: "connecting" });
    });

    it("gets the kept tab back after it reloads in the background", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.openTab(2);
        browser.activate(1);
        watch();
        await flush();
        browser.activate(2);
        await flush();

        browser.startReload(1);
        await flush();
        expect(view).toEqual({ status: "connecting" });

        browser.finishReload(1, playing("Let It Be"));
        await flush();
        expect(view).toEqual({ status: "connected", state: playing("Let It Be") });
    });

    it("reports a missing content script when the connected tab navigates off the site", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.activate(1);
        watch();
        await flush();

        browser.startReload(1);
        await flush();
        browser.finishReload(1);
        await flush();

        expect(view).toEqual({ status: "no-content-script" });
    });

    it("reports a missing content script when the kept tab is closed", async () => {
        browser.openTab(1, playing("Hey Jude"));
        browser.openTab(2);
        browser.activate(1);
        watch();
        await flush();
        browser.activate(2);
        await flush();

        browser.close(1);
        await flush();

        expect(view).toEqual({ status: "no-content-script" });
    });
});
