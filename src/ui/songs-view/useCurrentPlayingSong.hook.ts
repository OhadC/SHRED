import { useComputed } from "@preact/signals-react";
import { apiHooks } from "../shread/hooks/apiHooks.hook";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "../shread/hooks/useAsyncSignal.hook";
import { type SongInfo } from "../shread/models/models";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentPlayingSong(): UseAsyncSignalState<SongInfo> {
    const currentPlayingStreamingServiceSong = apiHooks.useCurrentPlayingStreamingServiceSong();

    const songInfo = useAsyncSignalComputed(
        async () =>
            currentPlayingStreamingServiceSong.value &&
            getSongInfoFromSongsterr(currentPlayingStreamingServiceSong.value.title, currentPlayingStreamingServiceSong.value.artist),
    );

    return {
        ...songInfo,
        data: useComputed(() => songInfo.data.value ?? currentPlayingStreamingServiceSong.value),
    };
}
