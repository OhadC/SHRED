import { useTranslationMap } from "./util/hooks/useTranslationMap";

const enUS = {
    tabs: {
        currentView: "Current view",
        favorites: "Favorites",
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

export const useAppTranslations = () => useTranslationMap(translationMap);
