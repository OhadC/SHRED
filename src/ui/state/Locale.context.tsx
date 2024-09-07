import { useMemo, useState, type PropsWithChildren } from "react";
import { createSafeContext } from "~/ui/util/context/create-safe-context";

export const DEFAULT_LOCALE = "en-US";

export type LocaleContextData = {
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
};

const [useLocale, Provider] = createSafeContext<LocaleContextData>("LocaleContext");

export { useLocale };

export function LocaleContextProvider({ children }: PropsWithChildren) {
    const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);

    const value = useMemo<LocaleContextData>(() => ({ locale, setLocale }), [locale]);

    return <Provider value={value}>{children}</Provider>;
}
