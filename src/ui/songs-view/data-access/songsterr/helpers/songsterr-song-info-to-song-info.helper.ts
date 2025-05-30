import { TabsWebsite, type SongInfo } from "~/ui/models/song.models";
import { type SongsterrSongInfo, type SongsterrTrackInfo } from "./songsterr.model";

export function songsterrSongInfoToSongInfo(innerSongInfo: SongsterrSongInfo): SongInfo {
    const defaultTrackIndex = getDefaultTrackIndex(innerSongInfo.tracks);
    const defaultTrack = innerSongInfo.tracks[defaultTrackIndex];

    const url = getSongUrl(innerSongInfo.songId, innerSongInfo.artist, innerSongInfo.title);

    return {
        artist: innerSongInfo.artist,
        title: innerSongInfo.title,
        url: url,
        difficulty: defaultTrack?.difficulty,
        from: TabsWebsite.Songsterr,
        tuning: defaultTrack?.tuning,
    };
}

function getDefaultTrackIndex(tracks: SongsterrTrackInfo[]): number | undefined {
    const getIndexForMaxViews = (filterPredicate: (track: SongsterrTrackInfo) => boolean): number | undefined =>
        tracks.reduce<number | undefined>(
            // taken from original code. search for ".tracks.reduce"
            (maxIndex, currentTrack, index) =>
                filterPredicate(currentTrack) && currentTrack.views > (tracks[maxIndex!]?.views ?? -1) ? index : maxIndex,
            undefined,
        );

    return (
        getIndexForMaxViews(track => isGuitarInstrument(track.instrumentId)) ??
        getIndexForMaxViews(track => isBassInstrument(track.instrumentId))
    );
}

function getSongUrl(songId: number, artist: string, title: string): string {
    const songsterrTitle = toSongsterrTitle(`${artist}-${title}`);

    return `https://www.songsterr.com/a/wsa/${songsterrTitle}-tab-s${songId}`;
}

function isGuitarInstrument(instrumentId: number): boolean {
    return 24 <= instrumentId && instrumentId <= 31;
}

function isBassInstrument(instrumentId: number): boolean {
    return 32 <= instrumentId && instrumentId <= 39;
}

function toSongsterrTitle(string: string): string {
    // from original code. search for ".toLowerCase().normalize"
    return string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\/|\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");
}
