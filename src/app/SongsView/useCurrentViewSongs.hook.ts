import { useComputed } from "@preact/signals-react";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "~app/shared/hooks/use-async-signal.hook";
import { type SongInfo } from "../models";
import { apiHooks } from "../shared/hooks/api-hooks";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentViewSongs(): UseAsyncSignalState<SongInfo[]> {
    const currentViewStreamingServiceSong = apiHooks.useCurrentViewStreamingServiceSong();

    const currentViewSongs = useAsyncSignalComputed(async () => {
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
