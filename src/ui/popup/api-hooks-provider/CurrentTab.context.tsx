import { useSignal, type ReadonlySignal } from "@preact/signals-react";
import { createContext, useContext, useEffect } from "react";
import { container } from "tsyringe";
import { type Tabs } from "webextension-polyfill";
import { BrowserProxy } from "./browser-proxy";

type CurrentTabContextData = ReadonlySignal<Tabs.Tab | undefined>;

const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export function useCurrentTab(): CurrentTabContextData {
    return useContext(CurrentTabContext);
}

export const CurrentTabContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const currentTab = useSignal<Tabs.Tab | undefined>(undefined);

    useEffect(() => {
        const browserProxy = container.resolve(BrowserProxy);

        browserProxy.getActiveTab().then(tab => (currentTab.value = tab));

        return browserProxy.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => (currentTab.value = tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
