import { useComputed } from "@preact/signals-react";
import { type SongInfo } from "../models/models";
import { useCurrentPlayingStreamingServiceSong } from "../state/Api.context";
import { useAsyncSignalComputed } from "../util/hooks/useAsyncSignal.hook";
import type { ReadonlyPromiseSignal } from "../util/promise-signal";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentPlayingSong(): ReadonlyPromiseSignal<SongInfo> {
    const currentPlayingStreamingServiceSong = useCurrentPlayingStreamingServiceSong();

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
