import { useComputed } from "@preact/signals-react";
import { apiHooks } from "../shread/hooks/apiHooks.hook";
import { useAsyncSignalComputed } from "../shread/hooks/useAsyncSignal.hook";
import { type SongInfo } from "../shread/models/models";
import type { ReadonlyPromiseSignal } from "../shread/util/promise-signal";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentPlayingSong(): ReadonlyPromiseSignal<SongInfo> {
    const currentPlayingStreamingServiceSong = apiHooks.useCurrentPlayingStreamingServiceSong();

    const songInfo = useAsyncSignalComputed(async () => {
        const song = currentPlayingStreamingServiceSong.data.value;

        return song && getSongInfoFromSongsterr(song.title, song.artist).then(songInfo => songInfo ?? song);
    });

    return {
        data: songInfo.data,
        loading: useComputed(() => currentPlayingStreamingServiceSong.loading.value || songInfo.loading.value),
        error: useComputed(() => currentPlayingStreamingServiceSong.error.value || songInfo.error.value),
    };
}
