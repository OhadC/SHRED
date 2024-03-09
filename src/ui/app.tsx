import styled, { createGlobalStyle } from "styled-components";
import { LocaleContextProvider } from "./shread/contexts/Locale.context";
import { SongsView } from "./songs-view/SongsView";

export type AppComponentProps = { className?: string };

export function AppComponent({ className }: AppComponentProps) {
    return (
        <>
            <AppGlobalStyles />
            <Container className={className}>
                <LocaleContextProvider>
                    <SongsView />
                </LocaleContextProvider>
            </Container>
        </>
    );
}

const Container = styled.div`
    --popup-container-padding: calc(var(--inline-padding) / 2);

    padding: var(--popup-container-padding);
    padding-inline-end: max(calc(var(--popup-container-padding) - var(--scrollbar-width)), 2px);
    font-size: 1em;
`;

const AppGlobalStyles = createGlobalStyle`
    body {
        --primary-color: hsl(40, 97%, 54%); // tailwind Amber 500
    
        --accent-color: hsl(24, 95%, 54%); // tailwind Orange 600
    
        --background-color: hsl(0, 0%, 9%); // tailwind Zinc 900
        --text-color: hsl(0, 0%, 90%); // tailwind Zinc 100
    
        --inline-padding: 18px;
    
        --scrollbar-color: hsl(0, 0%, 32%);
        --scrollbar-border-color: hsl(0, 0%, 16%);
        --scrollbar-width: 0.5em;

        margin: 0;

        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 12px;

        background-color: var(--background-color);
        color: var(--text-color);

        cursor: default;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    *,
    *:before,
    *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .ellipsis-one-line,
    .standalone-ellipsis-one-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .standalone-ellipsis-one-line {
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
    }

    * > ::-webkit-scrollbar {
        width: auto;
        max-width: var(--scrollbar-width);
        max-height: var(--scrollbar-width);

        &-corner,
        &-track {
            background: none;
        }

        &-thumb {
            background: var(--scrollbar-color);
            border: 1px solid var(--scrollbar-border-color);
            border-radius: var(--scrollbar-width);
        }
    }
`;
