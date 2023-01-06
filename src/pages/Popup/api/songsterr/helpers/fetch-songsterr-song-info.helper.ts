import { getStringsSimilarity } from "../../../../../shared/get-strings-similarity";
import { addClientProperties } from "./add-client-properties.helper";
import { SongsterrSongInfo } from "./songsterr.model";

const MIN_ACCEPTEBLE_SIMILARITY = 0.5;

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

    return fetch(`https://www.songsterr.com/api/songs?pattern=${encodedPattern}&size=${numberOfResults}`).then(res => res.json());
}

function isSimilar(string1: string, string2: string): boolean {
    return getStringsSimilarity(string1, string2) >= MIN_ACCEPTEBLE_SIMILARITY;
}
