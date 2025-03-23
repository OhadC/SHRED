import _ from "lodash";
import { useMemo, useState, type PropsWithChildren } from "react";
import type { StreamingServiceSong } from "~/api/api.model";
import { useIsSticky } from "~/ui/shared/hooks/use-is-sticky";
import { cn } from "~/util/tailwind/cn";
import { useSongInfo } from "../hooks/use-song-info";
import { Search } from "./search";
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
        () => uniqSongList?.filter(song => [song.artist, song.title].some(text => text?.toLowerCase().includes(searchText.toLowerCase()))),
        [uniqSongList, searchText],
    );

    const { isStickyRef, isSticky } = useIsSticky();

    return (
        <div className="flex flex-col pt-2">
            <div
                className={cn("sticky top-0 z-10 h-12 px-2", isSticky && "bg-background bg-gradient-to-b from-primary/15 to-primary/15")}
                ref={isStickyRef}
            >
                <div className="flex size-full items-center border-b-1 border-foreground/10 px-2 pile">
                    <h2 className="text-xl font-bold text-primary">{title}</h2>

                    {searchable && <Search searchText={searchText} setSearchText={setSearchText} className="relative w-full" />}
                </div>
            </div>

            <div className="flex flex-col px-2 pt-1">
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

function StreamingServiceSongItem({ song }: { song: StreamingServiceSong }) {
    const songInfo = useSongInfo(song);

    return <SongItem songInfo={songInfo.data} />;
}
