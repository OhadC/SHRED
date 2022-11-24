import React from "react";
import { SongList } from "./components/SongList";
import { useSongsViewTranslations } from "./SongsView.translations";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export const SongsView: React.FunctionComponent = () => {
    const currentPlayingSong = useCurrentPlayingSong();
    const currentViewSongs = useCurrentViewSongs();
    const translations = useSongsViewTranslations();

    return (
        <>
            {currentPlayingSong && <SongList songList={[currentPlayingSong]} title={translations.playingNow} />}

            {currentViewSongs.length ? <SongList songList={currentViewSongs} title={translations.currentView} /> : undefined}
        </>
    );
};
