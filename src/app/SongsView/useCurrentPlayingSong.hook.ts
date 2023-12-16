import { useAsync } from "react-use";
import { type SongInfo } from "../models";
import { apiHooks } from "../shared/hooks/api-hooks";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentPlayingSong() {
    const currentPlayingStreamingServiceSong = apiHooks.useCurrentPlayingStreamingServiceSong();

    return useAsync(async () => {
        const songInfo: SongInfo | undefined =
            currentPlayingStreamingServiceSong &&
            (await getSongInfoFromSongsterr(currentPlayingStreamingServiceSong.title, currentPlayingStreamingServiceSong.artist));

        return songInfo ?? currentPlayingStreamingServiceSong;
    }, [currentPlayingStreamingServiceSong]);
}
