import _ from "lodash";
import { DynamicHeightTransition } from "../../shared/components/DynamicHeightTransition";
import { type SongInfo } from "../../shared/models/song.models";
import { SongItem, SongItemEmpty } from "./SongItem";

type SongListProps = {
    title: string;
    songList?: SongInfo[];
    isPending: boolean;
    emptyListText: string;
    skeletonCount?: number;
};

export function SongList({ title, songList, isPending, emptyListText, skeletonCount }: SongListProps) {
    return (
        <DynamicHeightTransition className="flex flex-col space-y-2">
            {<h2 className="px-2 text-lg font-bold text-primary">{title}</h2>}

            <div className="flex flex-col gap-1">
                {isPending ? (
                    _.times(skeletonCount ?? 1, num => <SongItem key={num} />)
                ) : songList?.length ? (
                    songList.map((songInfo, index) => (
                        <SongItem songInfo={songInfo} key={`${songInfo.artist}__${songInfo.title}__${index}`} />
                    ))
                ) : (
                    <SongItemEmpty text={emptyListText} />
                )}
            </div>
        </DynamicHeightTransition>
    );
}
