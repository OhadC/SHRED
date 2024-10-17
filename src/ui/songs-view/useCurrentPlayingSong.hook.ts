import { useQuery } from "@tanstack/react-query";
import { useCurrentPlayingStreamingServiceSong } from "../shared/contexts/Api.context";
import type { AsyncState } from "../shared/models/async-state.model";
import { type SongInfo } from "../shared/models/song.models";
import { getSongInfoFromSongsterr } from "./data-access/songsterr/get-song-info-from-songsterr";

export function useCurrentPlayingSong(): AsyncState<SongInfo> {
    const currentPlayingStreamingServiceSong = useCurrentPlayingStreamingServiceSong();

    return useQuery({
        queryKey: [
            "SongInfoFromSongsterr",
            currentPlayingStreamingServiceSong.data?.title,
            currentPlayingStreamingServiceSong.data?.artist,
        ],
        enabled: !!currentPlayingStreamingServiceSong.data,
        queryFn: () =>
            getSongInfoFromSongsterr(currentPlayingStreamingServiceSong.data.title, currentPlayingStreamingServiceSong.data.artist),
    });
}
