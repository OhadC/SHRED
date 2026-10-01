import type { SongInfo } from "~/ui/models/song.models";
import { promiseResult } from "~/util/promise-result";
import { fetchSongsterrSongInfo } from "./helpers/fetch-songsterr-song-info.helper";
import { songsterrSongInfoToSongInfo } from "./helpers/songsterr-song-info-to-song-info.helper";

// TODO: set as an interface to support more APIs

export async function getSongInfoFromSongsterr(title: string, artist?: string): Promise<SongInfo | undefined> {
    const [error, songsterrTrackInfo] = await promiseResult(fetchSongsterrSongInfo(title, artist));
    if (error) {
        console.error("SHRED getSongInfoFromSongsterr", error);
        return;
    }

    if (!songsterrTrackInfo) {
        return;
    }

    return songsterrSongInfoToSongInfo(songsterrTrackInfo);
}
