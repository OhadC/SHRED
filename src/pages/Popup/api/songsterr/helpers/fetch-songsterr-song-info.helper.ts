import { getStringsSimilarity } from "../../../../../shared/get-strings-similarity";
import { addClientProperties } from "./add-client-properties.helper";
import { SongsterrSongInfo } from "./songsterr.model";

const MIN_ACCEPTEBLE_SIMILARITY = 0.5;

export async function fetchSongsterrSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    const songsterrSongInfos = await tryToFetchSong(title, artist);

    const songsterrSongInfo = songsterrSongInfos?.find(info => isSimilar(info.title, title) && (!artist || isSimilar(info.artist, artist)));

    songsterrSongInfo && addClientProperties(songsterrSongInfo);

    return songsterrSongInfo;
}

async function tryToFetchSong(title: string, artist?: string): Promise<SongsterrSongInfo[] | undefined> {
    let result: SongsterrSongInfo[] | undefined;
    if (artist) {
        const pattern = `${artist}%20${title}`;

        result = await fetchPattern(pattern);
    }

    if (!result) {
        result = await fetchPattern(title);
    }

    return result;
}

async function fetchPattern(pattern: string, numberOfResults = 5): Promise<SongsterrSongInfo[]> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then(res => res.json());

    return songInfos;
}

function isSimilar(string1: string, string2: string): boolean {
    return getStringsSimilarity(string1, string2) >= MIN_ACCEPTEBLE_SIMILARITY;
}
