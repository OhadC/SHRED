import { useState } from "react";
import { createSafeContext } from "~/ui/shared/contexts/create-safe-context";

export const DEFAULT_LOCALE = "en-US";

const [useLocale, Provider] = createSafeContext<string>();

export { useLocale };

export const LocaleContextProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);

    return <Provider value={locale}>{children}</Provider>;
};
