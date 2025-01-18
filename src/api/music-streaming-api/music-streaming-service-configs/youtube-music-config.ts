import { SupportedHost } from "~/config/supported-hosts";
import { type MusicStreamingServiceConfig } from "../music-streaming-api.model";
import { SelectorBasedMusicStreamingApi } from "../selector-based-music-streaming-api/selector-based-music-streaming-api";
import { type SelectorBasedMusicStreamingServiceConfig } from "../selector-based-music-streaming-api/selector-based-music-streaming-api.model";

const shelfRendererSelector = "ytmusic-shelf-renderer .ytmusic-shelf-renderer#contents";
const playlistShelfRendererSelector = "ytmusic-playlist-shelf-renderer .ytmusic-playlist-shelf-renderer#contents";
const responsiveListItemRendererSelectors = {
    songRowDomElements: "ytmusic-responsive-list-item-renderer",
    titleDomElement: ".ytmusic-responsive-list-item-renderer.title-column",
    artistDomElement: ".ytmusic-responsive-list-item-renderer.secondary-flex-columns:nth-child(0)",
};

export const YOUTUBE_MUSIC_CONFIG: MusicStreamingServiceConfig<SelectorBasedMusicStreamingServiceConfig> = {
    urlMatch: SupportedHost.YoutubeMusic,
    musicStreamingApiClass: SelectorBasedMusicStreamingApi,
    classBasedConfig: {
        currentPlayingSong: {
            selectors: {
                containerDomElement: `ytmusic-player-bar .ytmusic-player-bar.content-info-wrapper`,
                titleDomElement: `.ytmusic-player-bar.title`,
                artistsDomElement: `.ytmusic-player-bar.subtitle a.yt-simple-endpoint`,
            },
        },
        currentViewSongs: {
            views: [
                {
                    urlMatch: "/watch?",
                    selectors: {
                        songsTable: "ytmusic-player-queue .ytmusic-player-queue#contents",
                        songRowDomElements: "ytmusic-player-queue-item .song-info",
                        titleDomElement: ".ytmusic-player-queue-item.song-title",
                        artistDomElement: ".ytmusic-player-queue-item.byline",
                    },
                },
                {
                    urlMatch: "/channel/",
                    selectors: {
                        songsTable: shelfRendererSelector,
                        ...responsiveListItemRendererSelectors,
                    },
                },
                {
                    // Normal playlist
                    urlMatch: "/playlist",
                    predicate: () => !!document.querySelector(playlistShelfRendererSelector),
                    selectors: {
                        songsTable: playlistShelfRendererSelector,
                        ...responsiveListItemRendererSelectors,
                    },
                },
                {
                    // Artist playlist
                    urlMatch: "/playlist",
                    predicate: () => !!document.querySelector(shelfRendererSelector),
                    selectors: {
                        songsTable: shelfRendererSelector,
                        ...responsiveListItemRendererSelectors,
                        artistDomElement: `ytmusic-responsive-header-renderer .ytmusic-responsive-header-renderer a[href^="channel/"]`,
                        isArtistFromRow: false,
                    },
                },
            ],
        },
    },
};
