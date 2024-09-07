import type { ReactNode } from "react";
import { SongList } from "../components/SongList";
import { useFavoriteSongsContext } from "../state/favorite-songs.context";
import { useFavoritesViewTranslations } from "./FavoritesView.translations";

export function FavoritesView(): ReactNode {
    const { favoriteSongs } = useFavoriteSongsContext();
    const translations = useFavoritesViewTranslations();

    return <SongList songList={favoriteSongs} title={""} isLoading={false} emptyListText={translations.noSongsInFavorites} />;
}
