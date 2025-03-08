import { useTranslationMap } from "../shared/hooks/useTranslationMap";

const enUS = {
    songsView: {
        playingNow: "Playing Now",
        playingNowEmpty: "Not playing any song at the moment",
        currentView: "Current View",
        currentViewEmpty: "There are no songs in the current view",
    },
    songList: {
        loading: "Loading...",
        search: "Search",
        close: "Close",
        searchPlaceholder: "Search...",
    },
    SongDifficulty: {
        Difficulty1: "Beginner. Tier 1",
        Difficulty2: "Beginner. Tier 2",
        Difficulty3: "Intermediate. Tier 1",
        Difficulty4: "Intermediate. Tier 2",
        Difficulty5: "Intermediate. Tier 3",
        Difficulty6: "Advanced. Tier 1",
        Difficulty7: "Advanced. Tier 2",
        Difficulty8: "Advanced. Tier 3",
    },
};

const translationMap: Record<string, typeof enUS> = {
    "en-US": enUS,
};

export const useSongsViewTranslations = () => useTranslationMap(translationMap);
