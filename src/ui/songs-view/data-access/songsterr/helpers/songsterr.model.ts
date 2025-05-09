export interface SongsterrSongInfo {
    artist: string;
    title: string;
    artistId: number;
    hasAudio: true;
    hasTracks: true;
    songId: number;
    defaultTrack?: number;
    tracks: SongsterrTrackInfo[];
}

export interface SongsterrTrackInfo {
    difficulty: number;
    difficultyVersion?: number;
    tuning: number[];
    instrumentId: number;
    views: number;
}
