import { SongsterrSongInfo, SongsterrTrackInfo } from "./songsterr.model";

// mutate original object - add keys
export function addClientProperties(innerSongInfo: SongsterrSongInfo) {
    innerSongInfo.defaultTrackIndex = getDefaultTrackIndex(innerSongInfo);
    innerSongInfo.url = getSongUrl(innerSongInfo);
}

function getSongUrl(innerSongInfo: SongsterrSongInfo): string {
    const songsterrTitle = toSongsterrTitle(`${innerSongInfo.artist}-${innerSongInfo.title}`);

    return `https://www.songsterr.com/a/wsa/${songsterrTitle}-tab-s${innerSongInfo.songId}`;
}

function getDefaultTrackIndex(innerSongInfo: SongsterrSongInfo): number {
    const getIndexForMaxViews = (
        tracks: SongsterrTrackInfo[],
        filterPredicate: (track: SongsterrTrackInfo) => boolean
    ): number | undefined =>
        tracks.reduce<number | undefined>(
            // taken from original code. search for ".tracks.reduce"
            (maxIndex, currentTrack, index) =>
                filterPredicate(currentTrack) && currentTrack.views > (innerSongInfo.tracks[maxIndex!]?.views ?? -1) ? index : maxIndex,
            undefined
        );

    return (
        getIndexForMaxViews(innerSongInfo.tracks, track => isGuitarInstrumen(track.instrumentId)) ??
        getIndexForMaxViews(innerSongInfo.tracks, track => isBassInstrumen(track.instrumentId)) ??
        innerSongInfo.defaultTrack ??
        0
    );
}

function isGuitarInstrumen(instrumentId: number): boolean {
    return instrumentId >= 24 && instrumentId <= 31;
}

function isBassInstrumen(instrumentId: number): boolean {
    return instrumentId >= 32 && instrumentId <= 39;
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
