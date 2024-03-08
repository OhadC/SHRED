import { type MusicStreamingServiceConfig } from "../music-streaming-api.model";
import { SelectorBasedMusicStreamingApi } from "../selector-based-music-streaming-api/selector-based-music-streaming-api";
import {
    type MusicStreamingServiceConfigCurrentViewSongsSelectors,
    type SelectorBasedMusicStreamingServiceConfig,
} from "../selector-based-music-streaming-api/selector-based-music-streaming-api.model";

const sharedTableSelectors = {
    songRowDomElements: `[data-test="tracklist-row"]`,
    titleDomElement: `[data-test="table-row-title"] [data-test="table-cell-title"]`,
    artistDomElement: `[data-test="track-row-artist"]`,
    songsTable: `[data-type="media-table"] [role="rowgroup"]`,
} satisfies Partial<MusicStreamingServiceConfigCurrentViewSongsSelectors>;

export const TIDAL_CONFIG: MusicStreamingServiceConfig<SelectorBasedMusicStreamingServiceConfig> = {
    urlMatch: "listen.tidal.com/",
    musicStreamingApiClass: SelectorBasedMusicStreamingApi,
    classBasedConfig: {
        currentPlayingSong: {
            selectors: {
                containerDomElement: `[data-test="left-column-footer-player"] > *:nth-child(2)`,
                titleDomElement: `[data-test="footer-track-title"] a`,
                artistsDomElement: `[class^="mediaArtists"] a`,
            },
        },
        currentViewSongs: {
            views: [
                {
                    urlMatch: "/playlist/",
                    selectors: { ...sharedTableSelectors },
                },
                {
                    urlMatch: "/album/",
                    selectors: { ...sharedTableSelectors },
                },
                {
                    urlMatch: "/artist/",
                    selectors: { ...sharedTableSelectors },
                },
                {
                    urlMatch: "/view/pages/single-module-page/",
                    selectors: { ...sharedTableSelectors },
                },
            ],
        },
    },
};
