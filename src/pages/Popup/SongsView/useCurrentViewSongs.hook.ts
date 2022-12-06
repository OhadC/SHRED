import { useEffect, useState } from "react";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { useCurrentTab } from "../shared/contexts/CurrentTab.context";
import { SongInfo } from "../models";

export function useCurrentViewSongs() {
    const currentTab = useCurrentTab();

    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        setIsLoading(true);

        contentScriptApi
            .getCurrentViewSongsFromTab(currentTab.id)
            .then(songs =>
                Promise.all(songs?.map(song => getSongInfoFromSongsterr(song.title, song.artist).then(songInfo => songInfo ?? song)) ?? [])
            )
            .then(response => {
                setCurrentViewSongs(response);
                setIsLoading(false);
            });
    }, [currentTab]);

    return { currentViewSongs, isLoading };
}
