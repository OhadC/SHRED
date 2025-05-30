import { useQuery } from "@tanstack/react-query";
import type { StreamingServiceSong } from "~/api/api.model";
import type { AsyncState } from "~/ui/models/async-state.model";
import type { SongInfo } from "~/ui/models/song.models";
import { getSongInfoFromSongsterr } from "../data-access/songsterr/get-song-info-from-songsterr";

export function useSongInfo(song: StreamingServiceSong): AsyncState<SongInfo> {
    return useQuery({
        queryKey: ["SongInfoFromSongsterr", song?.title, song?.artist],
        enabled: !!song,
        queryFn: async () => (await getSongInfoFromSongsterr(song.title, song.artist)) ?? song,
    });
}
