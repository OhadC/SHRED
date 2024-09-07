import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { createSafeContext } from "~/ui/util/context/create-safe-context";
import type { SongInfo } from "../models/models";

export type FavoriteSongsContextData = {
    favoriteSongs: SongInfo[];
    addSongToFavorites: (songInfo: SongInfo) => void;
    removeSongFromFavorites: (songInfo: SongInfo) => void;
    clearFavorites: () => void;
};

const [useFavoriteSongsContext, Provider] = createSafeContext<FavoriteSongsContextData>("FavoritesContext");

export { useFavoriteSongsContext };

export function useIsSongInFavorites(songInfo: SongInfo | undefined) {
    const { favoriteSongs } = useFavoriteSongsContext();

    return useMemo(() => favoriteSongs.some(song => song.url === songInfo?.url), [favoriteSongs, songInfo]);
}

export function FavoriteSongsContextProvider({ children }: PropsWithChildren) {
    const [favoriteSongs, setFavoriteSongs] = useBackgroundLocalStorage<SongInfo[]>("favorite-songs", []);

    const addSongToFavorites = useCallback(
        (songInfo: SongInfo) => setFavoriteSongs(favorites => [...favorites, songInfo]),
        [setFavoriteSongs],
    );
    const removeSongFromFavorites = useCallback(
        (songInfo: SongInfo) => setFavoriteSongs(favorites => favorites.filter(song => song.url !== songInfo.url)),
        [setFavoriteSongs],
    );
    const clearFavorites = useCallback(() => setFavoriteSongs([]), [setFavoriteSongs]);

    const value = useMemo<FavoriteSongsContextData>(
        () => ({
            favoriteSongs,
            addSongToFavorites,
            removeSongFromFavorites,
            clearFavorites,
        }),
        [favoriteSongs],
    );

    return <Provider value={value}>{children}</Provider>;
}

function useBackgroundLocalStorage<TValue>(
    key: string,
    defaultValue: TValue,
): [TValue, (set: TValue | ((current: TValue) => TValue)) => void] {
    const valueRef = useRef<TValue>(defaultValue);
    const [, setValueIndex] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const value: TValue = (await chrome.storage.sync.get(key))?.[key];
            if (value) {
                valueRef.current = value;
                setValueIndex(i => i + 1);
            }
        })();
    }, []);

    const setLocalStorageValue = useCallback((valueOrFn: TValue | ((value: TValue) => TValue)) => {
        const newValue = typeof valueOrFn === "function" ? (valueOrFn as (value: TValue) => TValue)(valueRef.current) : valueOrFn;

        valueRef.current = newValue;
        chrome.storage.sync.set({ [key]: newValue });
        setValueIndex(i => i + 1);
    }, []);

    return useMemo(() => [valueRef.current, setLocalStorageValue], [valueRef.current, setLocalStorageValue]);
}
