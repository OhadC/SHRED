import { createContext, useContext, useEffect, useState } from "react";
import { type Tabs } from "webextension-polyfill";
import { browserApi } from "../../api/browser-api";

type CurrentTabContextData = Tabs.Tab | undefined;

const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export function useCurrentTab(): CurrentTabContextData {
    return useContext(CurrentTabContext);
}

export const CurrentTabContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        browserApi.getActiveTab().then(tab => setCurrentTab(tab));

        return browserApi.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
