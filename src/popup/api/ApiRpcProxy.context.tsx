import { useSignal, type ReadonlySignal } from "@preact/signals-react";
import { createContext, useContext, useEffect } from "react";
import Browser from "webextension-polyfill";
import { apiServiceRpcToken, type ApiService } from "~shared/shared-api.model";
import { WebextensionRpcConsumer } from "~shared/webextension-rpc";

type ApiRpcProxyContextData = ReadonlySignal<WebextensionRpcConsumer<ApiService> | undefined>;

const ApiRpcProxyContext = createContext<ApiRpcProxyContextData>(undefined);

export function useApiRpcProxy(): ApiRpcProxyContextData {
    return useContext(ApiRpcProxyContext);
}

export const ApiRpcProxyContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const apiRpcProxy = useSignal<WebextensionRpcConsumer<ApiService> | undefined>(undefined);

    useEffect(() => {
        Browser.tabs
            .query({ currentWindow: true, active: true })
            .then(
                ([currentTab]) =>
                    (apiRpcProxy.value = new WebextensionRpcConsumer<ApiService>({ token: apiServiceRpcToken, tabId: currentTab.id })),
            );
    }, []);

    return <ApiRpcProxyContext.Provider value={apiRpcProxy}>{children}</ApiRpcProxyContext.Provider>;
};
