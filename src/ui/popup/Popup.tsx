import { StrictMode } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppComponent } from "../app";
import { PopupApiHooksProvider } from "./api-hooks-provider";

export function Popup() {
    return (
        <StrictMode>
            <PopupGlobalStyles />
            <PopupApiHooksProvider>
                <PopupContainer />
            </PopupApiHooksProvider>
        </StrictMode>
    );
}

const PopupContainer = styled(AppComponent)`
    max-height: calc(600px - 2 * var(--popup-container-padding)); // 600px is chrome limitation
    overflow-y: scroll;
`;

const PopupGlobalStyles = createGlobalStyle`
    body {
        width: 340px;
    }
`;
