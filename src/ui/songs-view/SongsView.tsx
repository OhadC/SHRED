import { useCurrentPlayingStreamingServiceSong, useCurrentViewStreamingServiceSongs } from "../shared/contexts/Api.context";
import { useSongsViewTranslations } from "./SongsView.translations";
import { SongList } from "./components/SongList";

export function SongsView() {
    const { data: currentPlayingSong, isPending: PendingCurrentPlayingSong } = useCurrentPlayingStreamingServiceSong();
    const { data: currentViewSongs, isPending: PendingCurrentViewSongs } = useCurrentViewStreamingServiceSongs();

    const translations = useSongsViewTranslations();

    return (
        <div className="space-y-2">
            <SongList
                songList={currentPlayingSong && [currentPlayingSong]}
                title={translations.songsView.playingNow}
                isPending={PendingCurrentPlayingSong}
                emptyListText={translations.songsView.playingNowEmpty}
            />

            <SongList
                songList={currentViewSongs}
                title={translations.songsView.currentView}
                isPending={PendingCurrentViewSongs}
                emptyListText={translations.songsView.currentViewEmpty}
                skeletonCount={5}
            />
        </div>
    );
}
