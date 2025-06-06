import type { SongInfo } from "~/ui/models/song.models";
import { promiseResult } from "~/util/promise-result";
import { getUiLogger } from "../../../util/ui-logger";
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

    if (!songsterrTrackInfo) {
        logger.info("no songsterr track info");
        return;
    }

    return songsterrSongInfoToSongInfo(songsterrTrackInfo);
}
