import type { PropsWithClassName } from "../models/with-class-name";
import { useCurrentPlayingStreamingServiceSong, useCurrentViewStreamingServiceSongs } from "../state/api-hooks/api-hooks.context";
import { SongList } from "./components/SongList";
import { useSongsViewTranslations } from "./SongsView.translations";

export function SongsView({ className }: PropsWithClassName) {
    const { data: currentPlayingSong, isPending: PendingCurrentPlayingSong } = useCurrentPlayingStreamingServiceSong();
    const { data: currentViewSongs, isPending: PendingCurrentViewSongs } = useCurrentViewStreamingServiceSongs();

    const translations = useSongsViewTranslations();

    return (
        <div className={className}>
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
                searchable
            />
        </div>
    );
}
