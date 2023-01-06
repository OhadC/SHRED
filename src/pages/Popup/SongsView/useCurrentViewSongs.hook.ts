import { useAsync } from "react-use";
import { StreamingServiceSong } from "../../../shared/shared.model";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { SongInfo } from "../models";
import { useCurrentTab } from "../shared/contexts/CurrentTab.context";

export function useCurrentViewSongs() {
    const currentTab = useCurrentTab();

    const { loading, error, value } = useAsync(async () => {
        if (currentTab?.id === undefined) {
            return [];
        }

        const songs: StreamingServiceSong[] | undefined = await contentScriptApi.getCurrentViewSongsFromTab(currentTab.id);

        const songInfoPromises: Promise<SongInfo>[] | undefined = songs?.map(song =>
            getSongInfoFromSongsterr(song.title, song.artist).then(songInfo => songInfo ?? song)
        );

        return Promise.all(songInfoPromises ?? []);
    }, [currentTab]);

    return { currentViewSongs: value, loading, error };
}
