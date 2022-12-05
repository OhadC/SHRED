import { SongsterrSongInfo, SongsterrTrackInfo } from "./songsterr.model";

// mutate original object - add keys
export function addClientProperties(innerSongInfo: SongsterrSongInfo) {
    innerSongInfo.defaultTrackIndex = getDefaultTrackIndex(innerSongInfo.tracks) ?? innerSongInfo.defaultTrack ?? 0;
    innerSongInfo.url = getSongUrl(innerSongInfo.songId, innerSongInfo.artist, innerSongInfo.title);
}

function getDefaultTrackIndex(tracks: SongsterrTrackInfo[]): number | undefined {
    const getIndexForMaxViews = (filterPredicate: (track: SongsterrTrackInfo) => boolean): number | undefined =>
        tracks.reduce<number | undefined>(
            // taken from original code. search for ".tracks.reduce"
            (maxIndex, currentTrack, index) =>
                filterPredicate(currentTrack) && currentTrack.views > (tracks[maxIndex!]?.views ?? -1) ? index : maxIndex,
            undefined
        );

    return (
        getIndexForMaxViews(track => isGuitarInstrumen(track.instrumentId)) ??
        getIndexForMaxViews(track => isBassInstrumen(track.instrumentId))
    );
}

function getSongUrl(songId: number, artist: string, title: string): string {
    const songsterrTitle = toSongsterrTitle(`${artist}-${title}`);

    return `https://www.songsterr.com/a/wsa/${songsterrTitle}-tab-s${songId}`;
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
