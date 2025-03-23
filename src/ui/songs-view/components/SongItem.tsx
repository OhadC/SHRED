import { useMemo } from "react";
import { cn } from "~/util/tailwind/cn";
import { EllipsisOneLine } from "../../shared/components/EllipsisOneLine";
import { type SongInfo } from "../../shared/models/song.models";
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
                "grid content-between gap-x-1.5 [grid-template-areas:_'title_difficulty'_'artist_tuning'] [grid-template-columns:_1fr_auto]",
                !songInfo?.url && noUrlStyle,
            )}
        >
            <div className={cn(leftGridCellStyle, "font-semibold [grid-column:title]")}>
                {songInfo ? <EllipsisOneLine text={songInfo.title}></EllipsisOneLine> : <OneLineSkeleton wClassName="w-28" />}
            </div>

            <div className={cn(rightGridCellStyle, "[grid-column:difficulty]")}>
                {songInfo ? (
                    songInfo.difficulty && <DifficultyBar songDifficulty={songInfo.difficulty} className="h-3" />
                ) : (
                    <OneLineSkeleton wClassName="w-14" />
                )}
            </div>

            <div className={cn(leftGridCellStyle, "text-foreground-light [grid-column:artist]")}>
                {songInfo ? <EllipsisOneLine text={songInfo.artist}></EllipsisOneLine> : <OneLineSkeleton wClassName="w-11" />}
            </div>

            <div className={cn(rightGridCellStyle, "text-foreground-light [grid-column:tuning]")}>
                {songInfo ? tuningAsString : <OneLineSkeleton wClassName="w-16" />}
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
    <div className={cn("col-span-2 h-3 animate-pulse rounded bg-foreground/20", wClassName)}></div>
);

const leftGridCellStyle = "flex justify-start items-center overflow-hidden";
const rightGridCellStyle = "flex justify-end items-center";
const songItemContainerStyle = "h-14 rounded-lg px-3 py-2 hover:bg-foreground/10 hover:shadow-md transition-all";
const noUrlStyle = "opacity-50";
