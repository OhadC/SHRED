import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import { type StreamingServiceSong } from "~shared/shared-api.model";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { type SongInfo } from "../models";
import { useCurrentTab } from "../shared/contexts/CurrentTab.context";

export function useCurrentPlayingSong() {
    const currentTab = useCurrentTab();

    const [currentPlayingStreamingServiceSong, setCurrentPlayingStreamingServiceSong] = useState<StreamingServiceSong | undefined>();
    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        return contentScriptApi.subscribeToCurrentPlayingSongFromTab(currentTab.id, setCurrentPlayingStreamingServiceSong);
    }, [currentTab?.id]);

    const { loading, error, value } = useAsync(async () => {
        const songInfo: SongInfo | undefined =
            currentPlayingStreamingServiceSong &&
            (await getSongInfoFromSongsterr(currentPlayingStreamingServiceSong.title, currentPlayingStreamingServiceSong.artist));

        return songInfo ?? currentPlayingStreamingServiceSong;
    }, [currentPlayingStreamingServiceSong]);

    return { currentPlayingSong: value, loading, error };
}
