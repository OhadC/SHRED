import _ from "lodash";
import { useMemo, useRef, useState, type PropsWithChildren } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { StreamingServiceSong } from "~/api/api.model";
import { CloseIcon, IconsSwitcher, SearchIcon } from "~/ui/shared/components/icons";
import { useMergeRefs } from "~/ui/shared/hooks/use-merge-refs";
import { useOutsideClick } from "~/ui/shared/hooks/use-outside-click";
import type { PropsWithClassName } from "~/ui/shared/models/with-class-name";
import { cn } from "~/util/tailwind/cn";
import { useSongInfo } from "../hooks/use-song-info";
import { useSongsViewTranslations } from "../SongsView.translations";
import { SongItem, SongItemEmpty } from "./SongItem";

type SongListProps = {
    title: string;
    songList?: StreamingServiceSong[];
    isPending: boolean;
    emptyListText: string;
    skeletonCount?: number;
    searchable?: boolean;
} & PropsWithChildren;

export function SongList({ title, songList, isPending, emptyListText, skeletonCount, searchable }: SongListProps) {
    const [searchText, setSearchText] = useState("");

    const uniqSongList = useMemo(() => _.uniqBy(songList, song => `${song.artist}__${song.title}`), [songList]);

    const filteredSongList = useMemo(
        () => uniqSongList?.filter(song => [song.artist, song.title].some(text => text.toLowerCase().includes(searchText.toLowerCase()))),
        [uniqSongList, searchText],
    );

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 z-10 flex items-center border-b-1 border-background-800 bg-background-900 px-2 pb-2 pt-4 pile">
                <h2 className="text-xl font-bold text-primary">{title}</h2>

                {searchable && <Search searchText={searchText} setSearchText={setSearchText} className="relative w-full" />}
            </div>

            <div className="flex flex-col gap-1 pt-1">
                {isPending ? (
                    _.times(skeletonCount ?? 1, num => <SongItem key={num} />)
                ) : filteredSongList?.length ? (
                    filteredSongList.map(song => <StreamingServiceSongItem song={song} key={`${song.artist}__${song.title}`} />)
                ) : (
                    <SongItemEmpty text={emptyListText} />
                )}
            </div>
        </div>
    );
}

function Search({
    searchText,
    setSearchText,
    className,
}: PropsWithClassName & {
    searchText: string;
    setSearchText: (text: string) => void;
}) {
    const translations = useSongsViewTranslations();
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const openSearch = () => {
        setOpen(true);
        inputRef.current?.focus();
    };

    const closeSearch = () => {
        setOpen(false);
        setSearchText("");
        inputRef.current?.blur();
    };

    useHotkeys("ctrl+f", openSearch, { preventDefault: true, document: inputRef.current?.ownerDocument });
    const escRef = useHotkeys("esc", closeSearch, { preventDefault: true, enableOnFormTags: true });
    const clickOutsideRef = useOutsideClick(closeSearch, open && !searchText);

    const listenersRef = useMergeRefs<HTMLDivElement>(escRef, clickOutsideRef);

    return (
        <div className={cn("flex justify-end", className)} ref={listenersRef}>
            <input
                ref={inputRef}
                type="text"
                placeholder={translations.songList.searchPlaceholder}
                className={cn(searchBoxSharedStyle, open && "w-full")}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                tabIndex={open ? 0 : -1}
            />

            <button
                className={cn(searchBoxSharedStyle, "absolute end-0 flex items-center justify-center", open && "bg-none")}
                onClick={open ? closeSearch : openSearch}
                aria-label={open ? translations.songList.close : translations.songList.search}
                title={open ? translations.songList.close : translations.songList.search}
            >
                <IconsSwitcher First={SearchIcon} Second={CloseIcon} isFirst={!open} className="size-5" />
            </button>
        </div>
    );
}

function StreamingServiceSongItem({ song }: { song: StreamingServiceSong }) {
    const songInfo = useSongInfo(song);

    return <SongItem songInfo={songInfo.data} />;
}

const searchBoxSharedStyle = "size-8 rounded-lg bg-background-800 p-2 transition-all";
