import { Signal, useSignal } from "@preact/signals-react";
import { createSafeContext } from "~/util/context/create-safe-context";

export const DEFAULT_LOCALE = "en-US";

const [useLocale, Provider] = createSafeContext<Signal<string>>();

export { useLocale };

export const LocaleContextProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    const locale = useSignal<string>(DEFAULT_LOCALE);

    return <Provider value={locale}>{children}</Provider>;
};
