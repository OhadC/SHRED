import { useMemo } from "react";
import { cn } from "~/util/tailwind/cn";
import { EllipsisOneLine } from "../../shared/components/EllipsisOneLine";
import { type SongInfo } from "../../shared/models/models";
import { tuningNumberToString } from "../helpers/tuning-number-to-string.helper";
import { DifficultyBar } from "./DifficultyBar";

export const SongItem: React.FC<{ songInfo?: SongInfo }> = ({ songInfo }) => {
    const tuningAsString = useMemo(() => songInfo?.tuning?.map(tuningNumberToString).reverse().join(" "), [songInfo?.tuning]);

    return (
        <a
            href={songInfo?.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                songItemContainerStyle,
                "grid content-between gap-1 [grid-template-areas:_'title_difficulty'_'artist_tuning'] [grid-template-columns:_1fr_auto] [grid-template-rows:_1lh_1lh]",
                !songInfo?.url && noUrlStyle,
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

            <div className={cn(leftGridCellStyle, "text-foreground-light [grid-column:artist]")}>
                {songInfo ? <EllipsisOneLine text={songInfo.artist}></EllipsisOneLine> : <OneLineSkeleton wClassName={"w-11"} />}
            </div>

            <div className={cn(rightGridCellStyle, "text-foreground-light [grid-column:tuning]")}>
                {songInfo ? tuningAsString : <OneLineSkeleton wClassName={"w-16"} />}
            </div>
        </a>
    );
};

export const SongItemEmpty: React.FC<{ text: string }> = ({ text }) => (
    <div className={cn(songItemContainerStyle, "flex items-center justify-center", noUrlStyle)}>
        <>{text}</>
    </div>
);

const OneLineSkeleton: React.FC<{ wClassName: `w-${number}` }> = ({ wClassName }) => (
    <div className={cn("col-span-2 h-3 animate-pulse rounded bg-background-700", wClassName)}></div>
);

const leftGridCellStyle = "flex justify-start items-center overflow-hidden";
const rightGridCellStyle = "flex justify-end items-center";
const songItemContainerStyle = "h-16 rounded-lg p-2 hover:bg-background-800 hover:shadow-md";
const noUrlStyle = "opacity-50";
