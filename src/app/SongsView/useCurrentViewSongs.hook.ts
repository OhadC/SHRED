import { useAsync } from "react-use";
import { type SongInfo } from "../models";
import { apiHooks } from "../shared/hooks/api-hooks";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentViewSongs() {
    const currentViewStreamingServiceSong = apiHooks.useCurrentViewStreamingServiceSong();

    const currentViewSongs = useAsync(async () => {
        const songInfoPromises: Promise<SongInfo>[] | undefined = currentViewStreamingServiceSong.value?.map(song =>
            getSongInfoFromSongsterr(song.title, song.artist).then(songInfo => songInfo ?? song),
        );

        return Promise.all(songInfoPromises ?? []);
    }, [currentViewStreamingServiceSong.value]);

    return {
        value: currentViewSongs.value,
        loading: currentViewStreamingServiceSong.loading || currentViewSongs.loading,
        error: currentViewStreamingServiceSong.error || currentViewSongs.error,
    };
}
