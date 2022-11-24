import React, { useState, createContext } from "react";
import { useContext } from "react";

type LocaleContextData = { locale: string; setLocale: React.Dispatch<React.SetStateAction<string>> };

const LocaleContext = createContext<LocaleContextData>(undefined!);

export function useLocale(): LocaleContextData {
    return useContext(LocaleContext);
}

export const LocaleContextProvider: React.FunctionComponent<{}> = ({ children }) => {
    const [locale, setLocale] = useState<string>("en-US");

    return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};
