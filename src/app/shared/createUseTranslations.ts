import { useLocale } from "./contexts/Locale.context";

export function createUseTranslations<T>(translationsMap: Record<string, T>) {
    return (): T => {
        const { locale } = useLocale();

        return translationsMap[locale];
    };
}
