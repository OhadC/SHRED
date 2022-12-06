import React, { createContext, useContext, useState } from "react";

export const DEFAULT_LOCALE = "en-US";

type LocaleContextData = { locale: string; setLocale: React.Dispatch<React.SetStateAction<string>> };

const LocaleContext = createContext<LocaleContextData>(undefined!);

export function useLocale(): LocaleContextData {
    return useContext(LocaleContext);
}

export const LocaleContextProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);

    return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};
