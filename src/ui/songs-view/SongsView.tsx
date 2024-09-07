import { SongList } from "../components/SongList";
import { useSongsViewTranslations } from "./SongsView.translations";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export function SongsView() {
    const { data: currentPlayingSong, loading: loadingCurrentPlayingSong } = useCurrentPlayingSong();
    const { data: currentViewSongs, loading: loadingCurrentViewSongs } = useCurrentViewSongs();

    const translations = useSongsViewTranslations();

    return (
        <div className="space-y-2">
            <SongList
                songList={currentPlayingSong.value ? [currentPlayingSong.value] : undefined}
                title={translations.playingNow}
                isLoading={loadingCurrentPlayingSong.value}
                emptyListText={translations.playingNowEmpty}
            />

            <SongList
                songList={currentViewSongs.value}
                title={translations.currentView}
                isLoading={loadingCurrentViewSongs.value}
                emptyListText={translations.currentViewEmpty}
                skeletonCount={5}
            />
        </div>
    );
}
