import React from "react";
import styled from "styled-components";
import { CurrentTabContextProvider } from "./CurrentTab.context";
import { DynamicHeightTransition } from "./shared-components/DynamicHeightTransition";
import { SongsView } from "./SongsView/SongsView";

export const PopupComponent: React.FunctionComponent = () => (
    <CurrentTabContextProvider>
        <PopupContainer>
            <DynamicHeightTransition>
                <SongsView />
            </DynamicHeightTransition>
        </PopupContainer>
    </CurrentTabContextProvider>
);

const PopupContainer = styled.div`
    --popup-container-padding: 0.875em;

    max-height: calc(600px - 2 * var(--popup-container-padding)); // 600px is chrome limitation
    overflow-y: scroll;
    padding: var(--popup-container-padding);
    padding-inline-end: max(calc(var(--popup-container-padding) - var(--scrollbar-width)), 2px);
    font-size: 1em;
`;
