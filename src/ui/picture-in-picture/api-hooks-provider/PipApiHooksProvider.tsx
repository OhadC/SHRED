import { ApiHooksProvider } from "../../shread/hooks/apiHooks.hook";
import { apiHooks } from "./api.hooks";

export const PipApiHooksProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return <ApiHooksProvider implementation={apiHooks}>{children}</ApiHooksProvider>;
};
