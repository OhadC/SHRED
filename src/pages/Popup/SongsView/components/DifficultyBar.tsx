import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { songDifficultySorted, songDifficultyToNumberMap } from "../../helpers/song-difficulty-number";
import { SongDifficulty } from "../../models";
import { useSongsViewTranslations } from "../SongsView.translations";

export const DifficultyBar = ({ songDifficulty }: { songDifficulty: SongDifficulty }) => {
    const translations = useSongsViewTranslations();

    const difficultyAsNumber: number | undefined = songDifficulty && +songDifficultyToNumberMap[songDifficulty];
    const difficultyAsstring: number | undefined = songDifficulty && +songDifficultyToNumberMap[songDifficulty];

    return (
        <StyledDifficultyBar title={translations.SongDifficulty[SongDifficulty[songDifficulty]]}>
            {_.times(difficultyAsNumber, index => (
                <div key={index}></div>
            ))}
        </StyledDifficultyBar>
    );
};

const StyledDifficultyBar = styled.div`
    display: grid;
    grid-template-columns: repeat(${songDifficultySorted.length + 1}, 3px);
    grid-gap: 2px;
    padding: 2px;
    border: 1px solid hsla(0, 0%, 100%, 32%);

    > div {
        background-color: hsla(0, 0%, 100%, 32%);
    }
`;
