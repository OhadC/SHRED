import { useTranslationMap } from "../util/hooks/useTranslationMap";

const enUS = {
    noSongsInFavorites: "No songs in favorites.",
};

const translationMap: Record<string, typeof enUS> = {
    "en-US": enUS,
};

export const useFavoritesViewTranslations = () => useTranslationMap(translationMap);
