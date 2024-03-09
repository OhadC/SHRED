import { Signal, useSignal } from "@preact/signals-react";
import { createContext, useContext } from "react";

export const DEFAULT_LOCALE = "en-US";

type LocaleContextData = Signal<string>;

const LocaleContext = createContext<LocaleContextData>(undefined!);

export function useLocale(): LocaleContextData {
    return useContext(LocaleContext);
}

export const LocaleContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const locale = useSignal<string>(DEFAULT_LOCALE);

    return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
};
