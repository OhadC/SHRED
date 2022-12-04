import { useEffect, useState } from "react";
import { StreamingServiceSong } from "../../../shared/shared.model";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { useCurrentTab } from "../shared/contexts/CurrentTab.context";
import { SongInfo } from "../models";

type CurrentPlayingSongData = SongInfo | undefined;

export function useCurrentPlayingSong(): CurrentPlayingSongData {
    const currentTab = useCurrentTab();

    const [currentPlayingSong, setCurrentPlayingSong] = useState<CurrentPlayingSongData>();

    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        return contentScriptApi.subscribeToCurrentPlayingSongFromTab(currentTab.id, async (song?: StreamingServiceSong) => {
            const songInfo: SongInfo | undefined = (song && (await getSongInfoFromSongsterr(song.title, song.artist))) ?? song;

            setCurrentPlayingSong(songInfo);
        });
    }, [currentTab]);

    return currentPlayingSong;
}
