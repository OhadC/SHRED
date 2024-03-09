import { type ReadonlySignal } from "@preact/signals-react";
import styled, { css } from "styled-components";
import { DynamicHeightTransition } from "../../shread/components/DynamicHeightTransition";
import { SectionTitle } from "../../shread/components/SectionTitle";
import { type SongInfo } from "../../shread/models/models";
import { useSongsViewTranslations } from "../SongsView.translations";
import { SongItem } from "./SongItem";

type SongListProps = { title: string; songList?: ReadonlySignal<SongInfo[]>; isLoading: ReadonlySignal<boolean>; emptyListText: string };

export function SongList({ title, songList, isLoading, emptyListText }: SongListProps) {
    const translations = useSongsViewTranslations();

    return (
        <DynamicHeightTransition>
            {<SongListSectionTitle>{title}</SongListSectionTitle>}

            <Container>
                {isLoading.value ? (
                    <TextItemContainer>{translations.value.songList.loading}</TextItemContainer>
                ) : songList.value?.length ? (
                    songList.value.map(songInfo => <SongListItem songInfo={songInfo} key={`${songInfo.artist}__${songInfo.title}`} />)
                ) : (
                    <TextItemContainer>{emptyListText}</TextItemContainer>
                )}
            </Container>
        </DynamicHeightTransition>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const SongListSectionTitle = styled(SectionTitle)`
    padding-inline: calc(var(--inline-padding) / 2);
`;

const ListItemCss = css`
    height: 58px;
    padding: calc(var(--inline-padding) / 2);
`;

const SongListItem = styled(SongItem)`
    ${ListItemCss}
`;

const TextItemContainer = styled.div`
    ${ListItemCss}
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
`;
