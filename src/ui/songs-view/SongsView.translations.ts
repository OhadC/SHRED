import { useTranslationMap } from "../util/hooks/useTranslationMap";

const enUS = {
    playingNow: "Playing Now",
    playingNowEmpty: "Not playing any song at the moment",
    currentView: "Current View",
    currentViewEmpty: "There are no songs in the current view",
    loading: "Loading...",
};

const translationMap: Record<string, typeof enUS> = {
    "en-US": enUS,
};

export const useSongsViewTranslations = () => useTranslationMap(translationMap);
