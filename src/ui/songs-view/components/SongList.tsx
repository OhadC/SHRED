import _ from "lodash";
import { useMemo } from "react";
import type { StreamingServiceSong } from "~/api/api.model";
import { DynamicHeightTransition } from "../../shared/components/DynamicHeightTransition";
import { useSongInfo } from "../hooks/use-song-info";
import { SongItem, SongItemEmpty } from "./SongItem";

type SongListProps = {
    title: string;
    songList?: StreamingServiceSong[];
    isPending: boolean;
    emptyListText: string;
    skeletonCount?: number;
};

export function SongList({ title, songList, isPending, emptyListText, skeletonCount }: SongListProps) {
    const uniqSongList = useMemo(() => _.uniqBy(songList, song => `${song.artist}__${song.title}`), [songList]);

    return (
        <DynamicHeightTransition className="flex flex-col space-y-2">
            {<h2 className="px-2 text-lg font-bold text-primary">{title}</h2>}

            <div className="flex flex-col gap-1">
                {isPending ? (
                    _.times(skeletonCount ?? 1, num => <SongItem key={num} />)
                ) : uniqSongList?.length ? (
                    uniqSongList.map(song => <StreamingServiceSongItem song={song} key={`${song.artist}__${song.title}`} />)
                ) : (
                    <SongItemEmpty text={emptyListText} />
                )}
            </div>
        </DynamicHeightTransition>
    );
}

function StreamingServiceSongItem({ song }: { song: StreamingServiceSong }) {
    const songInfo = useSongInfo(song);

    return <SongItem songInfo={songInfo.data} />;
}
