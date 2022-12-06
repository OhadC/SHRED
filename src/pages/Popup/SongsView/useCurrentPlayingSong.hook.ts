import { useEffect, useState } from "react";
import { StreamingServiceSong } from "../../../shared/shared.model";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { useCurrentTab } from "../shared/contexts/CurrentTab.context";
import { SongInfo } from "../models";

export function useCurrentPlayingSong() {
    const currentTab = useCurrentTab();

    const [currentPlayingSong, setCurrentPlayingSong] = useState<SongInfo | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        return contentScriptApi.subscribeToCurrentPlayingSongFromTab(currentTab.id, async (song?: StreamingServiceSong) => {
            setIsLoading(true);

            const songInfo: SongInfo | undefined = (song && (await getSongInfoFromSongsterr(song.title, song.artist))) ?? song;

            setCurrentPlayingSong(songInfo);
            setIsLoading(false);
        });
    }, [currentTab?.id]);

    return { currentPlayingSong, isLoading };
}
