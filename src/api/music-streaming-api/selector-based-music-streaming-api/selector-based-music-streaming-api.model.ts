export type SelectorBasedMusicStreamingServiceConfig = {
    currentPlayingSong: {
        selectors: {
            containerDomElement: string;
            titleDomElement: string;
            artistsDomElement: string;
        };
    };
    currentViewSongs: {
        views: {
            urlMatch: string;
            predicate?: () => boolean;
            selectors: MusicStreamingServiceConfigCurrentViewSongsSelectors;
        }[];
    };
};

export type MusicStreamingServiceConfigCurrentViewSongsSelectors = {
    songsTable: string;
    songRowDomElements: string;
    titleDomElement: string;
    artistDomElement: string;
    isArtistFromRow?: boolean; // default is true
};
