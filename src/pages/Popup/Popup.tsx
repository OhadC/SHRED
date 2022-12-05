import React from "react";
import styled from "styled-components";
import { DynamicHeightTransition } from "./shared/components/DynamicHeightTransition";
import { CurrentTabContextProvider } from "./shared/contexts/CurrentTab.context";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";
import { SongsView } from "./SongsView/SongsView";

export const PopupComponent: React.FunctionComponent = () => (
    <LocaleContextProvider>
        <CurrentTabContextProvider>
            <PopupContainer>
                <DynamicHeightTransition>
                    <SongsView />
                </DynamicHeightTransition>
            </PopupContainer>
        </CurrentTabContextProvider>
    </LocaleContextProvider>
);

const PopupContainer = styled.div`
    --popup-container-padding: calc(var(--inline-padding) / 2);

    max-height: calc(600px - 2 * var(--popup-container-padding)); // 600px is chrome limitation
    overflow-y: scroll;
    padding: var(--popup-container-padding);
    padding-inline-end: max(calc(var(--popup-container-padding) - var(--scrollbar-width)), 2px);
    font-size: 1em;
`;
