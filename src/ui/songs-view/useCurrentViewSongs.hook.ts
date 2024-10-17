import { useQuery } from "@tanstack/react-query";
import { useCurrentViewStreamingServiceSongs } from "../shared/contexts/Api.context";
import type { AsyncState } from "../shared/models/async-state.model";
import { type SongInfo } from "../shared/models/song.models";
import { getUiLogger } from "../shared/util/ui-logger";
import { getSongInfoFromSongsterr } from "./data-access/songsterr/get-song-info-from-songsterr";

const logger = getUiLogger("useCurrentViewSongs");

export function useCurrentViewSongs(): AsyncState<SongInfo[]> {
    const currentViewStreamingServiceSong = useCurrentViewStreamingServiceSongs();

    const currentViewSongs = useQuery({
        queryKey: ["currentViewSongs", currentViewStreamingServiceSong.data],
        enabled: !!currentViewStreamingServiceSong.data,
        queryFn: () => {
            return Promise.all(
                currentViewStreamingServiceSong.data.map(async song => (await getSongInfoFromSongsterr(song.title, song.artist)) || song),
            );
        },
    });

    return {
        data: currentViewSongs.data,
        isPending: currentViewStreamingServiceSong.isPending || currentViewSongs.isPending,
        error: currentViewStreamingServiceSong.error || currentViewSongs.error,
    };
}
