import _ from "lodash";
import styled from "styled-components";
import { SongDifficulty } from "../../shread/models/models";
import { useSongsViewTranslations } from "../SongsView.translations";
import { songDifficultySorted, songDifficultyToNumberMap } from "../helpers/song-difficulty-number";

export function DifficultyBar({ songDifficulty }: { songDifficulty: SongDifficulty }) {
    const translations = useSongsViewTranslations();

    const difficultyAsNumber: number | undefined = songDifficulty && +songDifficultyToNumberMap[songDifficulty];
    const difficultyAsString: string = songDifficulty && translations.value.SongDifficulty[songDifficulty.toString()];

    return (
        <StyledDifficultyBar title={difficultyAsString}>
            {_.times(difficultyAsNumber, index => (
                <div key={index}></div>
            ))}
        </StyledDifficultyBar>
    );
}

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
