import React from "react";
import styled from "styled-components";
import { AppComponent } from "~app/app";
import { ApiHooksProvider } from "~app/shared/hooks/api-hooks";
import { CurrentTabContextProvider } from "./api/CurrentTab.context";
import { apiHooks } from "./api/api.hooks";
import "./popup.scss";

export function Popup() {
    return (
        <React.StrictMode>
            <CurrentTabContextProvider>
                <ApiHooksProvider implementation={apiHooks}>
                    <PopupContainer>
                        <AppComponent />
                    </PopupContainer>
                </ApiHooksProvider>
            </CurrentTabContextProvider>
        </React.StrictMode>
    );
}

const PopupContainer = styled.div`
    --popup-container-padding: calc(var(--inline-padding) / 2);

    max-height: calc(600px - 2 * var(--popup-container-padding)); // 600px is chrome limitation
    overflow-y: scroll;
    padding: var(--popup-container-padding);
    padding-inline-end: max(calc(var(--popup-container-padding) - var(--scrollbar-width)), 2px);
    font-size: 1em;
`;

export default Popup;
