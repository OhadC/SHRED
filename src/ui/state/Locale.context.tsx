import { useState } from "react";
import { createSafeContext } from "~/ui/util/create-safe-context";

export const DEFAULT_LOCALE = "en-US";

const [useLocale, Provider] = createSafeContext<string>();

export const LocaleContextProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    const [locale, _setLocale] = useState<string>(DEFAULT_LOCALE);

    return <Provider value={locale}>{children}</Provider>;
};

export function useTranslationMap<T>(translationsMap: Record<string, T>): T {
    const locale = useLocale();

    return translationsMap[locale];
}
