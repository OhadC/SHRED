import { useComputed } from "@preact/signals-react";
import { useCurrentViewStreamingServiceSong } from "../shared/contexts/Api.context";
import { useAsyncSignalComputed } from "../shared/hooks/useAsyncSignal.hook";
import { type SongInfo } from "../shared/models/models";
import type { ReadonlyPromiseSignal } from "../shared/util/promise-signal";
import { getUiLogger } from "../shared/util/ui-logger";
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
