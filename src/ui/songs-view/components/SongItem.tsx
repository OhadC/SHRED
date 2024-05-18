import { useMemo, type PropsWithChildren } from "react";
import { cn } from "~/util/cn";
import { EllipsisOneLine } from "../../shread/components/EllipsisOneLine";
import { type SongInfo } from "../../shread/models/models";
import { tuningNumberToString } from "../helpers/tuning-number-to-string.helper";
import { DifficultyBar } from "./DifficultyBar";

export function SongItem({ songInfo }: { songInfo: SongInfo }) {
    const tuningAsString = useMemo(() => songInfo.tuning?.map(tuningNumberToString).reverse().join(" "), [songInfo.tuning]);

    return (
        <SongItemContainer url={songInfo.url}>
            <SongItemContainer.Title>
                <EllipsisOneLine text={songInfo.title}></EllipsisOneLine>
            </SongItemContainer.Title>
            <SongItemContainer.Difficulty>
                {songInfo.difficulty && <DifficultyBar songDifficulty={songInfo.difficulty} className="h-3" />}
            </SongItemContainer.Difficulty>
            <SongItemContainer.Artist>
                <EllipsisOneLine text={songInfo.artist}></EllipsisOneLine>
            </SongItemContainer.Artist>
            <SongItemContainer.Tuning>{tuningAsString}</SongItemContainer.Tuning>
        </SongItemContainer>
    );
}

export function SongItemLoading() {
    return (
        <SongItemContainer>
            <SongItemContainer.Title>
                <div className={cn(skeletonRowStyle, "w-28")}></div>
            </SongItemContainer.Title>
            <SongItemContainer.Difficulty>
                <div className={cn(skeletonRowStyle, "w-14")}></div>
            </SongItemContainer.Difficulty>
            <SongItemContainer.Artist>
                <div className={cn(skeletonRowStyle, "w-11")}></div>
            </SongItemContainer.Artist>
            <SongItemContainer.Tuning>
                <div className={cn(skeletonRowStyle, "w-16")}></div>
            </SongItemContainer.Tuning>
        </SongItemContainer>
    );
}
const skeletonRowStyle = "h-3 bg-background-700 rounded col-span-2 animate-pulse";

export function SongItemEmpty({ text }: { text: string }) {
    return (
        <SongItemContainer className="flex items-center justify-center">
            <>{text}</>
        </SongItemContainer>
    );
}

function SongItemContainer({ url, className, children }: PropsWithChildren<{ url?: string; className?: string }>) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "rounded-lg p-2 hover:bg-background-800 hover:shadow-md",
                "grid gap-1 [grid-template-areas:_'title_difficulty'_'artist_tuning'] [grid-template-columns:_1fr_auto] [grid-template-rows:_1lh_1lh]",
                !url && "opacity-50",
                className,
            )}
        >
            {children}
        </a>
    );
}

SongItemContainer.Title = ({ children }: PropsWithChildren<{}>) => {
    return <div className={cn(leftGridCellStyle, "font-semibold [grid-column:title]")}>{children}</div>;
};

SongItemContainer.Difficulty = ({ children }: PropsWithChildren<{}>) => {
    return <div className={cn(rightGridCellStyle, "[grid-column:difficulty]")}>{children}</div>;
};

SongItemContainer.Artist = ({ children }: PropsWithChildren<{}>) => {
    return <div className={cn(leftGridCellStyle, "text-foreground-light [grid-column:artist]")}>{children}</div>;
};

SongItemContainer.Tuning = ({ children }: PropsWithChildren<{}>) => {
    return <div className={cn(rightGridCellStyle, "text-foreground-light [grid-column:tuning]")}>{children}</div>;
};

const leftGridCellStyle = "flex justify-start items-center overflow-hidden";
const rightGridCellStyle = "flex justify-end items-center";
