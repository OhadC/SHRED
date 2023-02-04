import { MusicStreamingServiceConfig } from "../music-streaming-api.model";
import { SelectorBasedMusicStreamingApi } from "../selector-based-music-streaming-api/selector-based-music-streaming-api";
import {
    MusicStreamingServiceConfigCurrentViewSongsSelectors,
    SelectorBasedMusicStreamingServiceConfig,
} from "../selector-based-music-streaming-api/selector-based-music-streaming-api.model";

const sharedTableSelectors: MusicStreamingServiceConfigCurrentViewSongsSelectors = {
    songsTable: `[role="grid"]`,
    songRowDomElements: `[data-testid="tracklist-row"]`,
    titleDomElement: `a[data-testid="internal-track-link"]`,
    artistDomElement: `a[href^="/artist/"]`,
};

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
                    selectors: {
                        ...sharedTableSelectors,
                        songsTable: `[data-testid="track-list"]`,
                    },
                },
                {
                    urlMatch: "/artist/",
                    selectors: {
                        ...sharedTableSelectors,
                        songsTable: `[data-testid="track-list"]`,
                        artistDomElement: `[data-testid="entityTitle"]`,
                        isArtistFromRow: false,
                    },
                },
            ],
        },
    },
};
