import type { StreamingServiceSong } from "~shared/shared-api.model";

export enum SongDifficulty {
    VaryEasy = "VaryEasy",
    Easy = "Easy",
    BelowIntermediate = "BelowIntermediate",
    Intermediate = "Intermediate",
    UpperIntermediate = "UpperIntermediate",
    Hard = "Hard",
    VaryHard = "VaryHard",
}

export enum TabsWebsite {
    Songsterr = "Songsterr",
}

export interface SongInfo extends StreamingServiceSong {
    url?: string;
    tuning?: number[];
    difficulty?: SongDifficulty;
    from?: TabsWebsite;
}
