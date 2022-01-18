import _ from "lodash";
import { waitForElementToDisplay } from "../../../shared/dom-helpers";
import { StreamingServiceSong } from "../../../shared/shared.model";
import { DomApi } from "../helpers/dom-api";
import { MusicStreamingServiceConfig } from "./music-streaming-api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-service-configs/tidal-config";

const MUSIC_STREAMING_SERVICE_CONFIGS: MusicStreamingServiceConfig[] = [TIDAL_CONFIG, SPOTIFY_CONFIG];

export class MusicStreamingApi {
    private musicStreamingConfig: MusicStreamingServiceConfig | undefined;

    constructor(private domApi: DomApi) {
        this.musicStreamingConfig = this.getMusicStreamingConfig();
    }

    public async getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined> {
        const selectors = this.musicStreamingConfig?.currentPlayingSong.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.containerDomElement);

        const containerDomElement = this.domApi.querySelector(selectors.containerDomElement);
        const titleDomElement = containerDomElement?.querySelector<HTMLElement>(selectors.titleDomElement);
        const title = this.leanTitle(titleDomElement?.innerText);
        const artistsDomElement = containerDomElement?.querySelectorAll<HTMLElement>(selectors.artistsDomElement);
        const artist = artistsDomElement?.[0]?.innerText as string;

        if (title) {
            return {
                title,
                artist,
            };
        }
    }

    public async getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined> {
        const currentViewConfig = this.musicStreamingConfig?.currentViewSongs.views.find((view) =>
            this.domApi.getCurrentUrl().includes(view.urlMatch)
        );
        const selectors = currentViewConfig?.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(`${selectors.songsTable} ${selectors.songRowDomElements}`);

        const songsTable = this.domApi.querySelector(selectors.songsTable);
        const songRowDomElements = Array.from(songsTable?.querySelectorAll(selectors.songRowDomElements) ?? []);
        if (!songRowDomElements.length) {
            return;
        }

        return songRowDomElements.flatMap((songRowDomElement) => {
            const titleDomElement = songRowDomElement.querySelector<HTMLElement>(selectors.titleDomElement);
            const artistDomElement = songRowDomElement.querySelector<HTMLElement>(selectors.artistDomElement);

            const title = this.leanTitle(titleDomElement?.innerText);

            return title
                ? {
                      title: this.leanTitle(titleDomElement?.innerText)!,
                      artist: artistDomElement?.innerText,
                  }
                : [];
        });
    }

    public async getCurrentPlayingSongTitleContainerElement(): Promise<Element | undefined> {
        const selectors = this.musicStreamingConfig?.currentPlayingSong.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.containerDomElement);

        const containerDomElement = this.domApi.querySelector(selectors.containerDomElement);
        const titleDomElement = containerDomElement?.querySelector<HTMLElement>(selectors.titleDomElement);

        return titleDomElement ?? undefined;
    }

    private getMusicStreamingConfig(): MusicStreamingServiceConfig | undefined {
        return MUSIC_STREAMING_SERVICE_CONFIGS.find((musicStreamingConfig) =>
            this.domApi.getCurrentUrl().includes(musicStreamingConfig.urlMatch)
        );
    }

    private leanTitle(title?: string): string | undefined {
        if (!title) {
            return;
        }

        const removeMatches = _.flow(removeMatch(remasteredMatch), removeMatch(AlbumMatch));

        return removeMatches(title);
    }
}

const remasteredMatch = /(\(.*remaster.*\))|(remaster(ed)?)/gi;
const AlbumMatch = /(\(.*Album.*\))/gi;

const removeMatch = _.curry((regexp: string | RegExp, text: string): string => {
    const stringContainRemaster = text.match(regexp);

    return stringContainRemaster?.length ? text!.replace(stringContainRemaster[0], "") : text;
});
