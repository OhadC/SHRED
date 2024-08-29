import { getStringsSimilarity } from "~/util/get-strings-similarity";
import { fetchByBackground } from "../../../../shared/util/fetch-by-background";
import { addClientProperties } from "./add-client-properties.helper";
import { type SongsterrSongInfo } from "./songsterr.model";

const MIN_ACCEPTABLE_SIMILARITY = 0.5;

export async function fetchSongsterrSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    const songsterrSongInfos = await fetchSongInfo(title, artist);

    const songsterrSongInfo = songsterrSongInfos?.find(info => isSimilar(info.title, title) && (!artist || isSimilar(info.artist, artist)));

    return songsterrSongInfo && addClientProperties(songsterrSongInfo);
}

async function fetchSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo[] | undefined> {
    let result: SongsterrSongInfo[] | undefined;
    if (artist) {
        result = await fetchPattern(`${artist} ${title}`);
    }

    if (!result) {
        result = await fetchPattern(title);
    }

    return result;
}

async function fetchPattern(pattern: string, numberOfResults = 5): Promise<SongsterrSongInfo[]> {
    const encodedPattern = encodeURIComponent(pattern);

    return fetchByBackground(`https://www.songsterr.com/api/songs?pattern=${encodedPattern}&size=${numberOfResults}`);
}

function isSimilar(string1: string, string2: string): boolean {
    return getStringsSimilarity(string1, string2) >= MIN_ACCEPTABLE_SIMILARITY;
}
