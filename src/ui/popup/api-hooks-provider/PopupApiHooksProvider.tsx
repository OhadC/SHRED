import { ApiHooksProvider } from "../../shread/hooks/apiHooks.hook";
import { CurrentTabContextProvider } from "./CurrentTab.context";
import { apiHooks } from "./api.hooks";

export const PopupApiHooksProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <CurrentTabContextProvider>
            <ApiHooksProvider implementation={apiHooks}>{children}</ApiHooksProvider>
        </CurrentTabContextProvider>
    );
};
