import React, { useMemo } from "react";
import styled from "styled-components";
import { tuningNumberToString } from "../../helpers/tuning-number-to-string.helper";
import { SongInfo } from "../../models";
import { EllipsisOneLine } from "../../shared/components/EllipsisDiv";
import { DifficultyBar } from "./DifficultyBar";

export const SongItem = ({ songInfo, className }: { songInfo: SongInfo; className?: string }) => {
    const tuningAsString = useMemo(() => songInfo.tuning?.map(tuningNumberToString).reverse().join(" "), [songInfo.tuning]);

    return (
        <StyledSongItem href={songInfo.url} target="_blank" rel="noopener noreferrer" disabled={!songInfo.url} className={className}>
            <Title>
                <EllipsisOneLine text={songInfo.title}></EllipsisOneLine>
            </Title>
            {songInfo.difficulty && (
                <Difficulty>
                    <DifficultyBar songDifficulty={songInfo.difficulty} />
                </Difficulty>
            )}
            <Artist>
                <EllipsisOneLine text={songInfo.artist}></EllipsisOneLine>
            </Artist>
            <Tuning>{tuningAsString}</Tuning>
        </StyledSongItem>
    );
};

const StyledSongItem = styled.a<{ disabled: boolean }>`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "title difficulty" "artist tuning";
    grid-gap: 0.5em;
    border-radius: calc(var(--inline-padding) / 2);
    opacity: ${p => (p.disabled ? 0.5 : 1)};

    &:hover {
        background: hsla(0, 0%, 100%, 12%);
    }
`;

const Title = styled.div`
    grid-column: title;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
`;
const Artist = styled.div`
    grid-column: artist;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Difficulty = styled.div`
    grid-column: difficulty;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
        height: 1em;
    }
`;
const Tuning = styled.div`
    grid-column: tuning;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
