import { type MusicStreamingServiceConfig } from "../music-streaming-api.model";
import { SelectorBasedMusicStreamingApi } from "../selector-based-music-streaming-api/selector-based-music-streaming-api";
import {
    type MusicStreamingServiceConfigCurrentViewSongsSelectors,
    type SelectorBasedMusicStreamingServiceConfig,
} from "../selector-based-music-streaming-api/selector-based-music-streaming-api.model";

const sharedTableSelectors = {
    songsTable: `[data-testid="track-list"]`,
    songRowDomElements: `[data-testid="tracklist-row"]`,
    titleDomElement: `a[data-testid="internal-track-link"]`,
    artistDomElement: `a[href^="/artist/"]`,
} satisfies Partial<MusicStreamingServiceConfigCurrentViewSongsSelectors>;

export const SPOTIFY_CONFIG: MusicStreamingServiceConfig<SelectorBasedMusicStreamingServiceConfig> = {
    urlMatch: "open.spotify.com/",
    musicStreamingApiClass: SelectorBasedMusicStreamingApi,
    classBasedConfig: {
        currentPlayingSong: {
            selectors: {
                containerDomElement: `[data-testid="now-playing-widget"] > *:nth-child(2)`,
                titleDomElement: `[data-testid="context-item-info-title"]`,
                artistsDomElement: `[data-testid="context-item-info-subtitles"]`,
            },
        },
        currentViewSongs: {
            views: [
                {
                    urlMatch: "/playlist/",
                    selectors: {
                        ...sharedTableSelectors,
                        songsTable: `[data-testid="playlist-tracklist"]`,
                    },
                },
                {
                    urlMatch: "/album/",
                    selectors: { ...sharedTableSelectors },
                },
                {
                    urlMatch: "/collection/", // Liked Songs playlist
                    selectors: { ...sharedTableSelectors },
                },
                {
                    urlMatch: "/artist/",
                    selectors: {
                        ...sharedTableSelectors,
                        artistDomElement: `[data-testid="entityTitle"]`,
                        isArtistFromRow: false,
                    },
                },
            ],
        },
    },
};
