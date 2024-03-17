import { useMemo, type PropsWithChildren } from "react";
import { cn } from "~util/cn";
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
                <div className="h-3 w-28 bg-zinc-700 rounded col-span-2 animate-pulse"></div>
            </SongItemContainer.Title>
            <SongItemContainer.Difficulty>
                <div className="h-3 w-14 bg-zinc-700 rounded col-span-2 animate-pulse"></div>
            </SongItemContainer.Difficulty>
            <SongItemContainer.Artist>
                <div className="h-3 w-11 bg-zinc-700 rounded col-span-2 animate-pulse"></div>
            </SongItemContainer.Artist>
            <SongItemContainer.Tuning>
                <div className="h-3 w-16 bg-zinc-700 rounded col-span-2 animate-pulse"></div>
            </SongItemContainer.Tuning>
        </SongItemContainer>
    );
}

export function SongItemEmpty({ text }: { text: string }) {
    return (
        <SongItemContainer className="justify-center content-center">
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
                "h-[58px] p-2 rounded-lg hover:bg-zinc-800 hover:shadow-md",
                " grid gap-1 [grid-template-columns:_1fr_auto] [grid-template-areas:_'title_difficulty'_'artist_tuning']",
                !url && "opacity-50",
                className,
            )}
        >
            {children}
        </a>
    );
}

SongItemContainer.Title = ({ children }: PropsWithChildren<{}>) => {
    return <div className="[grid-column:title] flex justify-start content-center overflow-hidden font-bold">{children}</div>;
};

SongItemContainer.Difficulty = ({ children }: PropsWithChildren<{}>) => {
    return <div className="[grid-column:difficulty] flex justify-end content-center">{children}</div>;
};

SongItemContainer.Artist = ({ children }: PropsWithChildren<{}>) => {
    return <div className="[grid-column:artist] flex justify-start content-center overflow-hidden">{children}</div>;
};

SongItemContainer.Tuning = ({ children }: PropsWithChildren<{}>) => {
    return <div className="[grid-column:tuning] flex justify-end content-center">{children}</div>;
};
