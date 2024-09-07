import { useComputed } from "@preact/signals-react";
import { type SongInfo } from "../models/models";
import { useCurrentViewStreamingServiceSong } from "../state/Api.context";
import { useAsyncSignalComputed } from "../util/hooks/useAsyncSignal.hook";
import type { ReadonlyPromiseSignal } from "../util/promise-signal";
import { getUiLogger } from "../util/ui-logger";
import { getSongInfoFromSongsterr } from "./data-access/songsterr";

const logger = getUiLogger("useCurrentViewSongs");

export function useCurrentViewSongs(): ReadonlyPromiseSignal<SongInfo[]> {
    const currentViewStreamingServiceSong = useCurrentViewStreamingServiceSong();

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
