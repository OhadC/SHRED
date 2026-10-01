import { combineLatest, debounceTime, distinctUntilChanged, from, Observable, of, startWith, switchMap, throttleTime } from "rxjs";
import { type AsyncState } from "~/ui/models/async-state.model";
import { fromMutation } from "~/util/rxjs/from-mutation";
import { fromUrl } from "~/util/rxjs/from-url";
import { switchMapAsyncState } from "~/util/rxjs/switch-map-async-state";
import { waitForFunctionToResolve } from "~/util/wait-for-function-to-resolve";
import { type StreamingServiceSong, type TabState } from "../../api.model";
import {
    type MusicStreamingServiceConfigCurrentViewSongsSelectors,
    type SelectorBasedMusicStreamingServiceConfig,
} from "./selector-based-music-streaming-api.model";

export function getTabState$(config: SelectorBasedMusicStreamingServiceConfig): Observable<TabState> {
    return combineLatest({
        currentPlayingSong: getCurrentPlayingSong$(config),
        currentViewSongs: getCurrentViewSongs$(config),
    });
}

function getCurrentPlayingSong$(config: SelectorBasedMusicStreamingServiceConfig): Observable<AsyncState<StreamingServiceSong>> {
    return of(null).pipe(
        switchMapAsyncState(() =>
            from(waitForElementToDisplay(config.currentPlayingSong.selectors.containerDomElement)).pipe(
                switchMap(element =>
                    element
                        ? fromMutation(element, { childList: true, subtree: true }).pipe(
                              startWith(null),
                              debounceTime(100),
                              switchMap(() => getCurrentPlayingSong(config)),
                          )
                        : of(undefined),
                ),
            ),
        ),
        throttleTime(200, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(isJsonEqual),
    );
}

function getCurrentViewSongs$(config: SelectorBasedMusicStreamingServiceConfig): Observable<AsyncState<StreamingServiceSong[]>> {
    return fromUrl().pipe(
        switchMapAsyncState(() =>
            from(getCurrentViewSongsContainerElement(config)).pipe(
                switchMap(element =>
                    element
                        ? fromMutation(element, { childList: true, subtree: true }).pipe(
                              startWith(null),
                              debounceTime(100),
                              switchMap(() => getCurrentViewSongs(config)),
                          )
                        : of([]),
                ),
            ),
        ),
        throttleTime(200, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(isJsonEqual),
    );
}

async function getCurrentPlayingSong(config: SelectorBasedMusicStreamingServiceConfig): Promise<StreamingServiceSong | undefined> {
    const selectors = config.currentPlayingSong.selectors;
    const containerDomElement = await waitForElementToDisplay(selectors.containerDomElement);
    const titleDomElement = containerDomElement?.querySelector<HTMLElement>(selectors.titleDomElement);
    const title = titleDomElement?.innerText;
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

async function getCurrentViewSongs(config: SelectorBasedMusicStreamingServiceConfig): Promise<StreamingServiceSong[] | undefined> {
    const selectors = getCurrentViewSongsSelectors(config);
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
        const title = titleDomElement?.innerText;
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

async function getCurrentViewSongsContainerElement(config: SelectorBasedMusicStreamingServiceConfig): Promise<Element | undefined> {
    const selectors = getCurrentViewSongsSelectors(config);

    return selectors && waitForElementToDisplay(selectors.songsTable);
}

function getCurrentViewSongsSelectors(
    config: SelectorBasedMusicStreamingServiceConfig,
): MusicStreamingServiceConfigCurrentViewSongsSelectors | undefined {
    const currentViewConfig = config.currentViewSongs.views.find(
        view => document.URL.includes(view.urlMatch) && (!view.predicate || view.predicate()),
    );

    return currentViewConfig?.selectors;
}

const isJsonEqual = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

const waitForElementToDisplay = (selector: string) =>
    waitForFunctionToResolve(() => document.querySelector(selector)).catch(() => {
        throw Error(`Could not resolve selector: ${selector}`);
    });
