import { useEffect, useState } from "react";
import { TAB_READY_MESSAGE, TAB_STATE_PORT_NAME, type TabState } from "~/api/api.model";
import type { Unsubscribe } from "~/util/util.model";

export type TabView = { status: "connecting" } | { status: "no-content-script" } | { status: "connected"; state: TabState };

export function useActiveTabState(): TabView {
    const [view, setView] = useState<TabView>({ status: "connecting" });

    useEffect(() => watchActiveTabState(setView), []);

    return view;
}

export function watchActiveTabState(onChange: (view: TabView) => void): Unsubscribe {
    let connected: { tabId: number; port: chrome.runtime.Port } | undefined;
    let attempt: chrome.runtime.Port | undefined;
    let lastConnectedTabId: number | undefined;
    let reloadingTabId: number | undefined;
    let stopped = false;

    const reportIfDisconnected = () => {
        if (!connected && !attempt && reloadingTabId === undefined) {
            onChange({ status: "no-content-script" });
        }
    };

    const connect = (tabId: number) => {
        if (connected?.tabId === tabId) {
            return;
        }

        attempt?.disconnect();
        const port = chrome.tabs.connect(tabId, { name: TAB_STATE_PORT_NAME });
        attempt = port;

        port.onMessage.addListener((state: TabState) => {
            if (port === attempt) {
                connected?.port.disconnect();
                connected = { tabId, port };
                lastConnectedTabId = tabId;
                attempt = undefined;
            }

            if (port === connected?.port) {
                onChange({ status: "connected", state });
            }
        });

        port.onDisconnect.addListener(() => {
            ignoreLastError();

            if (port === attempt) {
                attempt = undefined;
                reportIfDisconnected();
            } else if (port === connected?.port) {
                connected = undefined;
                reloadingTabId = tabId;
                onChange({ status: "connecting" });
                connectToActiveTab();
            }
        });
    };

    const connectToActiveTab = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (stopped) {
            return;
        }

        if (tab?.id !== undefined) {
            connect(tab.id);
        } else {
            reportIfDisconnected();
        }
    };

    const onMessage = (message: unknown, sender: chrome.runtime.MessageSender) => {
        if ((message as { type?: string })?.type !== TAB_READY_MESSAGE) {
            return;
        }

        if (!connected && sender.tab?.id !== undefined && sender.tab.id === lastConnectedTabId) {
            connect(sender.tab.id);
        } else {
            connectToActiveTab();
        }
    };

    const onUpdated = (tabId: number, { status }: chrome.tabs.OnUpdatedInfo) => {
        if (status === "complete" && tabId === reloadingTabId) {
            reloadingTabId = undefined;
            connect(tabId);
        }
    };

    const onRemoved = (tabId: number) => {
        if (tabId === reloadingTabId) {
            reloadingTabId = undefined;
            reportIfDisconnected();
        }
    };

    onChange({ status: "connecting" });
    connectToActiveTab();
    chrome.tabs.onActivated.addListener(connectToActiveTab);
    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.onRemoved.addListener(onRemoved);
    chrome.runtime.onMessage.addListener(onMessage);

    return () => {
        stopped = true;
        chrome.tabs.onActivated.removeListener(connectToActiveTab);
        chrome.tabs.onUpdated.removeListener(onUpdated);
        chrome.tabs.onRemoved.removeListener(onRemoved);
        chrome.runtime.onMessage.removeListener(onMessage);
        attempt?.disconnect();
        connected?.port.disconnect();
    };
}

const ignoreLastError = () => chrome.runtime.lastError;
