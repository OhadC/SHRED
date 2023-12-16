import { createContext, useContext, useEffect, useState } from "react";
import { container } from "tsyringe";
import { type Tabs } from "webextension-polyfill";
import { BrowserProxy } from "./browser-proxy";

type CurrentTabContextData = Tabs.Tab | undefined;

const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export function useCurrentTab(): CurrentTabContextData {
    return useContext(CurrentTabContext);
}

export const CurrentTabContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        const browserProxy = container.resolve(BrowserProxy);

        browserProxy.getActiveTab().then(tab => setCurrentTab(tab));

        return browserProxy.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
