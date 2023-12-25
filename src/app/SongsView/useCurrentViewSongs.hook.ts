import { useComputed } from "@preact/signals-react";
import { type SongInfo } from "../models";
import { getAppLogger } from "../shared/app-logger";
import { apiHooks } from "../shared/hooks/api-hooks";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "../shared/hooks/use-async-signal.hook";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

const logger = getAppLogger("useCurrentViewSongs");

export function useCurrentViewSongs(): UseAsyncSignalState<SongInfo[]> {
    const currentViewStreamingServiceSong = apiHooks.useCurrentViewStreamingServiceSong();

    const currentViewSongs = useAsyncSignalComputed(async () => {
        if (!currentViewStreamingServiceSong.data.value) {
            return;
        }

        logger.log("Updating currentViewSongs by", currentViewStreamingServiceSong.data.value);

        const songInfoPromises: Promise<SongInfo>[] | undefined = currentViewStreamingServiceSong.data.value?.map(song =>
            getSongInfoFromSongsterr(song.title, song.artist).then(songInfo => songInfo ?? song),
        );

        return Promise.all(songInfoPromises ?? []);
    });

    return {
        data: currentViewSongs.data,
        loading: useComputed(() => currentViewStreamingServiceSong.loading.value || currentViewSongs.loading.value),
        error: useComputed(() => currentViewStreamingServiceSong.error.value || currentViewSongs.error.value),
    };
}
