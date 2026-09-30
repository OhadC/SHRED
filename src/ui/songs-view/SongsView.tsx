import { PENDING_TAB_STATE } from "~/api/api.model";
import type { PropsWithClassName } from "../models/with-class-name";
import type { TabView } from "../state/active-tab-state";
import { SongItemEmpty } from "./components/SongItem";
import { SongList } from "./components/SongList";
import { useSongsViewTranslations } from "./SongsView.translations";

export function SongsView({ className, tabView }: PropsWithClassName & { tabView: TabView }) {
    const translations = useSongsViewTranslations();

    if (tabView.status === "no-content-script") {
        return (
            <div className={className}>
                <div className="px-2 pt-2">
                    <SongItemEmpty text={translations.songsView.noContentScript} />
                </div>
            </div>
        );
    }

    const { currentPlayingSong, currentViewSongs } = tabView.status === "connected" ? tabView.state : PENDING_TAB_STATE;

    return (
        <div className={className}>
            <SongList
                songList={currentPlayingSong.data && [currentPlayingSong.data]}
                title={translations.songsView.playingNow}
                isPending={currentPlayingSong.isPending}
                emptyListText={translations.songsView.playingNowEmpty}
            />

            <SongList
                songList={currentViewSongs.data}
                title={translations.songsView.currentView}
                isPending={currentViewSongs.isPending}
                emptyListText={translations.songsView.currentViewEmpty}
                skeletonCount={5}
                searchable
            />
        </div>
    );
}
