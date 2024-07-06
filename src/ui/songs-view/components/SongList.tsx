import { type ReadonlySignal } from "@preact/signals-react";
import _ from "lodash";
import { DynamicHeightTransition } from "../../shread/components/DynamicHeightTransition";
import { type SongInfo } from "../../shread/models/models";
import { SongItem, SongItemEmpty } from "./SongItem";

type SongListProps = {
    title: string;
    songList?: ReadonlySignal<SongInfo[]>;
    isLoading: ReadonlySignal<boolean>;
    emptyListText: string;
    skeletonCount?: number;
};

export function SongList({ title, songList, isLoading, emptyListText, skeletonCount }: SongListProps) {
    return (
        <DynamicHeightTransition className="flex flex-col space-y-2">
            {<h2 className="px-2 text-lg font-bold text-primary">{title}</h2>}

            <div className="flex flex-col gap-1">
                {isLoading.value ? (
                    _.times(skeletonCount ?? 1, num => <SongItem key={num} />)
                ) : songList.value?.length ? (
                    songList.value.map(songInfo => <SongItem songInfo={songInfo} key={`${songInfo.artist}__${songInfo.title}`} />)
                ) : (
                    <SongItemEmpty text={emptyListText} />
                )}
            </div>
        </DynamicHeightTransition>
    );
}
