import { useLocale } from "../../state/Locale.context";

export function useTranslationMap<T>(translationsMap: Record<string, T>): T {
    const { locale } = useLocale();

    return translationsMap[locale];
}
