import { getStringsSimilarity } from "~/util/get-strings-similarity";
import { fetchByBackground } from "../../../../util/fetch-by-background";
import { type SongsterrSongInfo } from "./songsterr.model";

const MIN_ACCEPTABLE_SIMILARITY = 0.5;

export async function fetchSongsterrSongInfo(rawTitle: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    const title = leanTitle(rawTitle);
    const fetchedSongInfos = await fetchSongInfo(title, artist);

    const songInfosWithSimilarity = fetchedSongInfos.map(songsterrSongInfo => ({
        songsterrSongInfo,
        similarity: getSongInfoSimilarity(songsterrSongInfo, title, artist),
    }));

    const bestMatch = songInfosWithSimilarity.reduce<(typeof songInfosWithSimilarity)[number] | undefined>(
        (best, info) => (!best || info.similarity > best.similarity ? info : best),
        undefined,
    );

    if (!bestMatch || bestMatch.similarity < MIN_ACCEPTABLE_SIMILARITY) {
        return undefined;
    }

    return bestMatch.songsterrSongInfo;
}

function getSongInfoSimilarity(songsterrSongInfo: SongsterrSongInfo, title: string, artist?: string): number {
    const titleSimilarity = getStringsSimilarity(songsterrSongInfo.title, title);
    const artistSimilarity = artist ? getStringsSimilarity(songsterrSongInfo.artist, artist) : 0.5;

    return (titleSimilarity + artistSimilarity) / 2;
}

async function fetchSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo[]> {
    const byArtist: SongsterrSongInfo[] | undefined = artist && (await fetchPattern(`${artist} ${title}`));
    if (byArtist) {
        return byArtist;
    }

    return fetchPattern(title);
}

async function fetchPattern(pattern: string, numberOfResults = 5): Promise<SongsterrSongInfo[]> {
    const encodedPattern = encodeURIComponent(pattern);

    return fetchByBackground(`https://www.songsterr.com/api/songs?pattern=${encodedPattern}&size=${numberOfResults}`);
}

function leanTitle(title: string): string {
    return title.replace(remasteredMatch, "").replace(albumMatch, "");
}

const remasteredMatch = /(\(.*remaster.*\))|(remaster(ed)?)/i;
const albumMatch = /(\(.*Album.*\))/i;
