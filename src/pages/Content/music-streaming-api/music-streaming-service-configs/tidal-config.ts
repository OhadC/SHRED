import { MusicStreamingServiceConfig, MusicStreamingServiceConfigCurrentViewSongsSelectors } from "../music-streaming-api.model";

const sharedTableSelectors: Omit<MusicStreamingServiceConfigCurrentViewSongsSelectors, "songsTable"> = {
    songRowDomElements: `[data-test="tracklist-row"]`,
    titleDomElement: `[data-test="table-row-title"] [data-test="table-cell-title"]`,
    artistDomElement: `[data-test="track-row-artist"]`,
};

const artistTopTracksTableSelectors: MusicStreamingServiceConfigCurrentViewSongsSelectors = {
    ...sharedTableSelectors,
    songsTable: `[data-track--source-type="artist"][data-type="media-table"] [role="rowgroup"]`,
};

export const TIDAL_CONFIG: MusicStreamingServiceConfig = {
    urlMatch: "listen.tidal.com/",
    currentPlayingSong: {
        selectors: {
            containerDomElement: `[data-test="left-column-footer-player"]`,
            titleDomElement: `[data-test="footer-track-title"] a`,
            artistsDomElement: `[class^="mediaArtists"] a`,
        },
    },
    currentViewSongs: {
        views: [
            {
                urlMatch: "/playlist/",
                selectors: {
                    ...sharedTableSelectors,
                    songsTable: `[data-track--source-type="playlist"][data-type="media-table"] [role="rowgroup"]`,
                },
            },
            {
                urlMatch: "/album/",
                selectors: {
                    ...sharedTableSelectors,
                    songsTable: `[data-track--source-type="album"][data-type="media-table"] [role="rowgroup"]`,
                },
            },
            {
                urlMatch: "/artist/",
                selectors: { ...artistTopTracksTableSelectors },
            },
            {
                urlMatch: "/view/pages/single-module-page/",
                selectors: { ...artistTopTracksTableSelectors },
            },
        ],
    },
};
