import { useComputed } from "@preact/signals-react";
import type { SongInfo } from "../models";
import { useSongsViewTranslations } from "./SongsView.translations";
import { SongList } from "./components/SongList";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export function SongsView() {
    const { data: currentPlayingSong, loading: loadingCurrentPlayingSong } = useCurrentPlayingSong();
    const { data: currentViewSongs, loading: loadingCurrentViewSongs } = useCurrentViewSongs();

    const translations = useSongsViewTranslations();

    return (
        <>
            <SongList
                songList={useComputed<SongInfo[]>(() => (currentPlayingSong.value ? [currentPlayingSong.value] : undefined))}
                title={translations.value.songsView.playingNow}
                isLoading={loadingCurrentPlayingSong}
                emptyListText={translations.value.songsView.playingNowEmpty}
            />

            <SongList
                songList={currentViewSongs}
                title={translations.value.songsView.currentView}
                isLoading={loadingCurrentViewSongs}
                emptyListText={translations.value.songsView.currentViewEmpty}
            />
        </>
    );
}
