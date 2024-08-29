import { TabsWebsite, type SongInfo } from "../../../../shared/models/models";
import { type SongsterrSongInfo } from "./songsterr.model";

export function songsterrSongInfoToSongInfo(innerSongInfo: SongsterrSongInfo): SongInfo {
    const defaultTrack = innerSongInfo.tracks[innerSongInfo.defaultTrackIndex!];

    return {
        artist: innerSongInfo.artist,
        title: innerSongInfo.title,
        url: innerSongInfo.url!,
        difficulty: defaultTrack.difficulty,
        from: TabsWebsite.Songsterr,
        tuning: defaultTrack.tuning,
    };
}
