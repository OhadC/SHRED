import { useSignal, type ReadonlySignal } from "@preact/signals-react";
import { useEffect, type PropsWithChildren } from "react";
import { container } from "tsyringe";
import { type Tabs } from "webextension-polyfill";
import { createSafeContext } from "~/ui/util/context/create-safe-context";
import { BrowserProxy } from "./browser-proxy";

const [useCurrentTab, Provider] = createSafeContext<ReadonlySignal<Tabs.Tab | undefined>>("CurrentTabContext");

export { useCurrentTab };

export function CurrentTabContextProvider({ children }: PropsWithChildren) {
    const currentTab = useSignal<Tabs.Tab | undefined>(undefined);

    useEffect(() => {
        const browserProxy = container.resolve(BrowserProxy);

        browserProxy.getActiveTab().then(tab => (currentTab.value = tab));

        return browserProxy.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => (currentTab.value = tab));
    }, []);

    return <Provider value={currentTab}>{children}</Provider>;
}
