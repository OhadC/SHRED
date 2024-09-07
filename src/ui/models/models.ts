import type { StreamingServiceSong } from "~/api/api.model";

export enum SongDifficulty {
    Difficulty1 = 1,
    Difficulty2,
    Difficulty3,
    Difficulty4,
    Difficulty5,
    Difficulty6,
    Difficulty7,
    Difficulty8,
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
