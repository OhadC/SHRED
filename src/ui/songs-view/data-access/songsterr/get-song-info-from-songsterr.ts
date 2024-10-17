import type { SongInfo } from "~/ui/shared/models/song.models";
import { promiseResult } from "~/util/promise-result";
import { getUiLogger } from "../../../shared/util/ui-logger";
import { fetchSongsterrSongInfo } from "./helpers/fetch-songsterr-song-info.helper";
import { songsterrSongInfoToSongInfo } from "./helpers/songsterr-song-info-to-song-info.helper";

// TODO: set as an interface to support more APIs

const logger = getUiLogger("getSongInfoFromSongsterr");

export async function getSongInfoFromSongsterr(title: string, artist?: string): Promise<SongInfo | undefined> {
    const [error, songsterrTrackInfo] = await promiseResult(fetchSongsterrSongInfo(title, artist));
    if (error) {
        logger.error("error", error);
        return;
    }

    return songsterrTrackInfo && songsterrSongInfoToSongInfo(songsterrTrackInfo);
}
