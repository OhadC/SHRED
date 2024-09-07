import { useCallback, useMemo } from "react";
import { cn } from "~/ui/util/tailwind/cn";
import { type SongInfo } from "../models/models";
import { tuningNumberToString } from "../songs-view/helpers/tuning-number-to-string.helper";
import { useFavoriteSongsContext, useIsSongInFavorites } from "../state/favorite-songs.context";
import { EllipsisOneLine } from "../util/components/EllipsisOneLine";
import { DifficultyBar } from "./DifficultyBar";

export function SongItem({ songInfo }: { songInfo: SongInfo | undefined }) {
    const tuningAsString = useMemo(() => songInfo?.tuning?.map(tuningNumberToString).reverse().join(" "), [songInfo?.tuning]);

    const hasUrl = songInfo?.url;

    return (
        <a
            href={hasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                songItemContainerStyle,
                "group grid content-between gap-1 [grid-template-areas:_'title_difficulty_favorites'_'artist_tuning_favorites'] [grid-template-columns:_1fr_auto_auto] [grid-template-rows:_1lh_1lh_auto]",
                !hasUrl && noUrlStyle,
            )}
        >
            <div className={cn(leftGridCellStyle, "font-semibold [grid-column:title]")}>
                {songInfo ? <EllipsisOneLine text={songInfo.title}></EllipsisOneLine> : <OneLineSkeleton wClassName={"w-28"} />}
            </div>

            <div className={cn(rightGridCellStyle, "[grid-column:difficulty]")}>
                {songInfo ? (
                    songInfo.difficulty && <DifficultyBar songDifficulty={songInfo.difficulty} className="h-3" />
                ) : (
                    <OneLineSkeleton wClassName={"w-14"} />
                )}
            </div>

            {hasUrl && <SongItemFavoritesButton songInfo={songInfo} />}

            <div className={cn(leftGridCellStyle, "text-foreground-light [grid-column:artist]")}>
                {songInfo ? <EllipsisOneLine text={songInfo.artist}></EllipsisOneLine> : <OneLineSkeleton wClassName={"w-11"} />}
            </div>

            <div className={cn(rightGridCellStyle, "text-foreground-light [grid-column:tuning]")}>
                {songInfo ? tuningAsString : <OneLineSkeleton wClassName={"w-16"} />}
            </div>
        </a>
    );
}

export function SongItemEmpty({ text }: { text: string }) {
    return <div className={cn(songItemContainerStyle, "flex items-center justify-center", noUrlStyle)}>{text}</div>;
}

function OneLineSkeleton({ wClassName }: { wClassName: `w-${number}` }) {
    return <div className={cn("col-span-2 h-3 animate-pulse rounded bg-background-700", wClassName)}></div>;
}

function SongItemFavoritesButton({ songInfo }: { songInfo: SongInfo }) {
    return null; // disable for now

    const isInFavorites = useIsSongInFavorites(songInfo);
    const { addSongToFavorites, removeSongFromFavorites } = useFavoriteSongsContext();
    const onStarClicked = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        event => {
            event.stopPropagation();
            event.preventDefault();

            isInFavorites ? removeSongFromFavorites(songInfo) : addSongToFavorites(songInfo);
        },
        [isInFavorites, songInfo, addSongToFavorites, removeSongFromFavorites],
    );

    return (
        <button
            className={cn(
                "hidden aspect-square h-full rounded [grid-column:favorites] hover:bg-background-600 group-hover:block",
                isInFavorites && "text-yellow-400",
            )}
            onClick={onStarClicked}
        >
            {isInFavorites ? "★" : "☆"}
        </button>
    );
}

const leftGridCellStyle = "flex justify-start items-center overflow-hidden";
const rightGridCellStyle = "flex justify-end items-center";
const songItemContainerStyle = "h-16 rounded-lg p-2 hover:bg-background-800 hover:shadow-md";
const noUrlStyle = "opacity-50";
