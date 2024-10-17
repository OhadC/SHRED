import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { type Tabs } from "webextension-polyfill";
import { createSafeContext } from "~/util/context/create-safe-context";
import { BrowserProxy } from "./browser-proxy";

const [useCurrentTab, Provider] = createSafeContext<Tabs.Tab | undefined>();

export { useCurrentTab };

export const CurrentTabContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<Tabs.Tab | undefined>(undefined);

    useEffect(() => {
        const browserProxy = container.resolve(BrowserProxy);

        browserProxy.getActiveTab().then(tab => setCurrentTab(tab));

        return browserProxy.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <Provider value={currentTab}>{children}</Provider>;
};
