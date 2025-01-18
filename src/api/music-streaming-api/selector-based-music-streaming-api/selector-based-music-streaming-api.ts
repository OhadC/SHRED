import _ from "lodash";
import { debounceTime, distinctUntilChanged, from, Observable, of, share, startWith, switchMap, tap, throttleTime } from "rxjs";
import { inject, singleton } from "tsyringe";
import { type AsyncState } from "~/ui/shared/models/async-state.model";
import { fromMutation } from "~/util/rxjs/from-mutation";
import { fromUrl } from "~/util/rxjs/from-url";
import { switchMapAsyncState } from "~/util/rxjs/switch-map-async-state";
import { waitForFunctionToResolve } from "~/util/wait-for-function-to-resolve";
import { getApiLogger } from "../../api-logger";
import { type StreamingServiceSong } from "../../api.model";
import { MusicStreamingClassBasedConfigToken, type IMusicStreamingApi } from "../music-streaming-api.model";
import {
    type MusicStreamingServiceConfigCurrentViewSongsSelectors,
    type SelectorBasedMusicStreamingServiceConfig,
} from "./selector-based-music-streaming-api.model";

const logger = getApiLogger("SelectorBasedMusicStreamingApi");

@singleton()
export class SelectorBasedMusicStreamingApi implements IMusicStreamingApi {
    public readonly currentPlayingSong$ = this.getCurrentPlayingSong$();
    private _currentPlayingSongState: AsyncState<StreamingServiceSong> = {
        isPending: true,
    };
    public get currentPlayingSongState() {
        return this._currentPlayingSongState;
    }

    public readonly currentViewSongs$ = this.getCurrentViewSongs$();
    private _currentViewSongsState: AsyncState<StreamingServiceSong[]> = {
        isPending: true,
    };
    public get currentViewSongsState() {
        return this._currentViewSongsState;
    }

    constructor(@inject(MusicStreamingClassBasedConfigToken) private config: SelectorBasedMusicStreamingServiceConfig) {}

    private getCurrentPlayingSong$(): Observable<AsyncState<StreamingServiceSong>> {
        return of(null).pipe(
            switchMapAsyncState(() =>
                from(this.getCurrentPlayingSongContainerElement()).pipe(
                    switchMap(element =>
                        element
                            ? fromMutation(element, { childList: true, subtree: true }).pipe(
                                  startWith(null),
                                  debounceTime(100),
                                  switchMap(() => this.getCurrentPlayingSong()),
                              )
                            : of(undefined),
                    ),
                ),
            ),
            throttleTime(200, undefined, { leading: true, trailing: true }),
            distinctUntilChanged(_.isEqual),
            tap(currentPlayingSong => (this._currentPlayingSongState = currentPlayingSong)),
            share(),
        );
    }

    private getCurrentViewSongs$(): Observable<AsyncState<StreamingServiceSong[]>> {
        return fromUrl().pipe(
            switchMapAsyncState(() =>
                from(this.getCurrentViewSongsContainerElement()).pipe(
                    switchMap(element =>
                        element
                            ? fromMutation(element, { childList: true, subtree: true }).pipe(
                                  startWith(null),
                                  debounceTime(100),
                                  switchMap(() => this.getCurrentViewSongs()),
                              )
                            : of([]),
                    ),
                ),
            ),
            throttleTime(200, undefined, { leading: true, trailing: true }),
            distinctUntilChanged(_.isEqual),
            tap(currentViewSongs => (this._currentViewSongsState = currentViewSongs)),
            share(),
        );
    }

    public async getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined> {
        const selectors = this.config.currentPlayingSong.selectors;
        const containerDomElement = await waitForElementToDisplay(selectors.containerDomElement);
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
        const selectors = this.getCurrentViewSongsSelectors();
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(`${selectors.songsTable} ${selectors.songRowDomElements}`);

        const songRowDomElements = Array.from(document.querySelectorAll(`${selectors.songsTable} ${selectors.songRowDomElements}`) ?? []);
        if (!songRowDomElements.length) {
            return;
        }

        return songRowDomElements.flatMap(songRowDomElement => {
            const titleDomElement = songRowDomElement.querySelector<HTMLElement>(selectors.titleDomElement);
            const title = this.leanTitle(titleDomElement?.innerText);
            if (!title) {
                return [];
            }

            const artistElementParent = (selectors.isArtistFromRow ?? true) ? songRowDomElement : document;
            const artistsDomElement = artistElementParent.querySelector<HTMLElement>(selectors.artistDomElement);
            const artist = artistsDomElement?.innerText;

            return {
                title,
                artist,
            };
        });
    }

    private async getCurrentPlayingSongContainerElement(): Promise<Element | undefined> {
        const selectors = this.config.currentPlayingSong.selectors;

        return waitForElementToDisplay(selectors.containerDomElement);
    }

    private async getCurrentViewSongsContainerElement(): Promise<Element | undefined> {
        const selectors = this.getCurrentViewSongsSelectors();

        return selectors && waitForElementToDisplay(selectors.songsTable);
    }

    private getCurrentViewSongsSelectors(): MusicStreamingServiceConfigCurrentViewSongsSelectors | undefined {
        const currentViewConfig = this.config.currentViewSongs.views.find(
            view => document.URL.includes(view.urlMatch) && (!view.predicate || view.predicate()),
        );

        return currentViewConfig?.selectors;
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

const waitForElementToDisplay = (selector: string) =>
    waitForFunctionToResolve(() => document.querySelector(selector)).catch(() => {
        throw Error(`Could not resolve selector: ${selector}`);
    });
