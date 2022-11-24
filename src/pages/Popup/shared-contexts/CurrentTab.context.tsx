import React, { useEffect, useState, createContext, useContext } from "react";
import { Tabs } from "webextension-polyfill-ts";
import { browserApi } from "../api/browser-api";

type CurrentTabContextData = Tabs.Tab | undefined;

const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export function useCurrentTab(): CurrentTabContextData {
    return useContext(CurrentTabContext);
}

export const CurrentTabContextProvider: React.FunctionComponent<{}> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        browserApi.getActiveTab().then(tab => setCurrentTab(tab));

        return browserApi.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
