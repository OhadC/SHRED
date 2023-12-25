export interface SongsterrSongInfo {
    artist: string;
    title: string;
    artistId: number;
    hasAudio: true;
    hasTracks: true;
    songId: number;
    defaultTrack?: number;
    tracks: SongsterrTrackInfo[];
    defaultTrackIndex?: number; // client side
    url?: string; // client side
}

export interface SongsterrTrackInfo {
    difficulty: SongsterrDifficulty;
    difficultyV3?: SongsterrDifficulty;
    difficultyVersion?: number;
    tuning: number[];
    instrumentId: number;
    views: number;
}

export enum SongsterrDifficulty {
    VERY_EASY = "VERY_EASY",
    EASY = "EASY",
    BELOW_INTERMEDIATE = "BELOW_INTERMEDIATE",
    INTERMEDIATE = "INTERMEDIATE",
    UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
    HARD = "HARD",
    VERY_HARD = "VERY_HARD",
}
