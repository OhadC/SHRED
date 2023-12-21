import { useComputed } from "@preact/signals-react";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "~app/shared/hooks/use-async-signal.hook";
import { type SongInfo } from "../models";
import { apiHooks } from "../shared/hooks/api-hooks";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

export function useCurrentPlayingSong(): UseAsyncSignalState<SongInfo> {
    const currentPlayingStreamingServiceSong = apiHooks.useCurrentPlayingStreamingServiceSong();

    const songInfo = useAsyncSignalComputed(
        async () =>
            currentPlayingStreamingServiceSong &&
            getSongInfoFromSongsterr(currentPlayingStreamingServiceSong.value.title, currentPlayingStreamingServiceSong.value.artist),
    );

    return {
        ...songInfo,
        data: useComputed(() => songInfo.data.value ?? currentPlayingStreamingServiceSong.value),
    };
}
