import { useComputed, type ReadonlySignal } from "@preact/signals-react";
import { useLocale } from "./contexts/Locale.context";

export function createUseTranslations<T>(translationsMap: Record<string, T>): ReadonlySignal<T> {
    const locale = useLocale();

    return useComputed(() => translationsMap[locale.value]);
}
