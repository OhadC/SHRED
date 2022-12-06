import React from "react";
import styled, { css } from "styled-components";
import { SongInfo } from "../../models";
import { DynamicHeightTransition } from "../../shared/components/DynamicHeightTransition";
import { SectionTitle } from "../../shared/components/SectionTitle";
import { useSongsViewTranslations } from "../SongsView.translations";
import { SongItem } from "./SongItem";

type SongListProps = { title: string; songList?: SongInfo[]; isLoading: boolean; emptyListText: string };

export const SongList = ({ title, songList, isLoading, emptyListText }: SongListProps) => {
    const translations = useSongsViewTranslations();

    return (
        <Container>
            {<SongListSectionTitle>{title}</SongListSectionTitle>}

            {isLoading ? (
                <TextItemContainer>{translations.songList.loading}</TextItemContainer>
            ) : songList?.length ? (
                songList.map((songInfo, index) => <SongListItem songInfo={songInfo} key={index} />)
            ) : (
                <TextItemContainer>{emptyListText}</TextItemContainer>
            )}
        </Container>
    );
};

const Container = styled(DynamicHeightTransition)`
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
