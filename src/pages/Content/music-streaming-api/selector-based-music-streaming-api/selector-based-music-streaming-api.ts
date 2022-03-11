import _ from "lodash";
import { waitForElementToDisplay } from "../../../../shared/dom-helpers";
import { StreamingServiceSong } from "../../../../shared/shared.model";
import { DomApi } from "../../helpers/dom-api";
import { getContentScriptLogger } from "../../util/content-script-logger";
import { MusicStreamingApi } from "../music-streaming-api.model";
import { SelectorBasedMusicStreamingServiceConfig } from "./selector-based-music-streaming-api.model";

const logger = getContentScriptLogger("SelectorBasedMusicStreamingApi");

export class SelectorBasedMusicStreamingApi implements MusicStreamingApi {
    constructor(private domApi: DomApi, private config: SelectorBasedMusicStreamingServiceConfig) {}

    public async getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined> {
        const selectors = this.config.currentPlayingSong.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.containerDomElement);

        const containerDomElement = this.domApi.querySelector(selectors.containerDomElement);
        const titleDomElement = containerDomElement?.querySelector<HTMLElement>(selectors.titleDomElement);
        const title = this.leanTitle(titleDomElement?.innerText);
        if (!title) {
            return;
        }

        const artistsDomElement = containerDomElement?.querySelector<HTMLElement>(selectors.artistsDomElement);
        const artist = artistsDomElement?.innerText;

        return {
            title,
            artist,
        };
    }

    public async getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined> {
        const currentViewConfig = this.config.currentViewSongs.views.find((view) => this.domApi.getCurrentUrl().includes(view.urlMatch));
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
            const title = this.leanTitle(titleDomElement?.innerText);
            if (!title) {
                return [];
            }

            const artistsDomElement = songRowDomElement.querySelector<HTMLElement>(selectors.artistDomElement);
            const artist = artistsDomElement?.innerText;

            return {
                title,
                artist,
            };
        });
    }

    public subscribeToCurrentPlayingSongChanges(callback: () => any): void {
        this.getCurrentPlayingSongContainerElement()
            .then((currentPlayingSongContainerElement) => {
                if (!currentPlayingSongContainerElement) {
                    return;
                }

                const resizeObserver = new ResizeObserver((entries) => {
                    callback();
                });
                resizeObserver.observe(currentPlayingSongContainerElement);
            })
            .catch((error) => {
                logger.error("subscribeToCurrentPlayingSongChanges error", error);
            });
    }

    private async getCurrentPlayingSongContainerElement(): Promise<Element | undefined> {
        const selectors = this.config.currentPlayingSong.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.containerDomElement);

        const containerDomElement = this.domApi.querySelector(selectors.containerDomElement);

        return containerDomElement ?? undefined;
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
