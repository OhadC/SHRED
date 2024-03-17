import { useTranslationMap } from "../shread/hooks/useTranslationMap";

const enUS = {
    songsView: {
        playingNow: "Playing Now",
        playingNowEmpty: "Not playing any song at the moment",
        currentView: "Current View",
        currentViewEmpty: "There are no songs in the current view",
    },
    songList: {
        loading: "Loading...",
    },
    SongDifficulty: {
        VaryEasy: "Vary easy",
        Easy: "Easy",
        BelowIntermediate: "Below intermediate",
        Intermediate: "Intermediate",
        UpperIntermediate: "Upper intermediate",
        Hard: "Hard",
        VaryHard: "Vary hard",
    },
};

export const useSongsViewTranslations = () =>
    useTranslationMap({
        "en-US": enUS,
    });
