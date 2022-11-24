import { useMemo } from "react";
import { useLocale } from "../shared-contexts/Locale.context";

export function createUseTranslations<T>(translationsMap: Record<string, T>) {
    return (): T => {
        const { locale } = useLocale();

        const translations = useMemo(() => translationsMap[locale], [locale]);

        return translations;
    };
}
