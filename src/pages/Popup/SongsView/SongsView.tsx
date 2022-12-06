import React, { useMemo } from "react";
import { SongList } from "./components/SongList";
import { useSongsViewTranslations } from "./SongsView.translations";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export const SongsView: React.FunctionComponent = () => {
    const { currentPlayingSong, isLoading: loadingCurrentPlayingSong } = useCurrentPlayingSong();
    const { currentViewSongs, isLoading: loadingCurrentViewSongs } = useCurrentViewSongs();
    const translations = useSongsViewTranslations();

    const currentPlayingSongAsList = useMemo(() => (currentPlayingSong ? [currentPlayingSong] : undefined), [currentPlayingSong]);

    return (
        <>
            {
                <SongList
                    songList={currentPlayingSongAsList}
                    title={translations.songsView.playingNow}
                    isLoading={loadingCurrentPlayingSong}
                    emptyListText={translations.songsView.playingNowEmpty}
                />
            }

            {
                <SongList
                    songList={currentViewSongs}
                    title={translations.songsView.currentView}
                    isLoading={loadingCurrentViewSongs}
                    emptyListText={translations.songsView.currentViewEmpty}
                />
            }
        </>
    );
};
