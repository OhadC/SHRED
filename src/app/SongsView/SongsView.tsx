import { useSongsViewTranslations } from "./SongsView.translations";
import { SongList } from "./components/SongList";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export const SongsView: React.FunctionComponent = () => {
    const { value: currentPlayingSong, loading: loadingCurrentPlayingSong } = useCurrentPlayingSong();
    const { value: currentViewSongs, loading: loadingCurrentViewSongs } = useCurrentViewSongs();
    const translations = useSongsViewTranslations();

    const currentPlayingSongAsList = currentPlayingSong ? [currentPlayingSong] : undefined;

    return (
        <>
            <SongList
                songList={currentPlayingSongAsList}
                title={translations.songsView.playingNow}
                isLoading={loadingCurrentPlayingSong}
                emptyListText={translations.songsView.playingNowEmpty}
            />

            <SongList
                songList={currentViewSongs}
                title={translations.songsView.currentView}
                isLoading={loadingCurrentViewSongs}
                emptyListText={translations.songsView.currentViewEmpty}
            />
        </>
    );
};
