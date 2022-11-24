import { createUseTranslations } from "../util/createUseTranslations";

const enUS = {
    playingNow: "Playing Now",
    currentView: "Current View",
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

export const useSongsViewTranslations = createUseTranslations({
    "en-US": enUS,
});
