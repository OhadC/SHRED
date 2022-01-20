import {
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
    ContentScriptEndpoint,
    StreamingServiceSong,
    ContentScriptEvents,
} from "../../../shared/shared.model";
import { browserApi } from "./browser-api";

class ContentScriptApi {
    getCurrentPlayingSongFromTab(tabId: number): Promise<StreamingServiceSong | undefined> {
        return browserApi
            .sendMessageToTab<GetCurrentPlayingSongResponse>(tabId, ContentScriptEndpoint.GetCurrentPlayingSong)
            .then((response) => response?.data);
    }

    getCurrentViewSongsFromTab(tabId: number): Promise<StreamingServiceSong[] | undefined> {
        return browserApi
            .sendMessageToTab<GetCurrentViewSongsResponse>(tabId, ContentScriptEndpoint.GetCurrentViewSongs)
            .then((response) => response?.data);
    }

    subscribeToCurrentPlayingSongFromTab(
        tabId: number,
        callback: (currentPlayingSong: StreamingServiceSong | undefined) => void
    ): () => void {
        let isUnsubscribed = false;

        const getCurrentPlayingSong = () =>
            this.getCurrentPlayingSongFromTab(tabId).then((currentPlayingSong) => {
                if (!isUnsubscribed) {
                    callback(currentPlayingSong);
                }
            });

        getCurrentPlayingSong();
        const unsubscriveToCurrentPlayingSongChanges = browserApi.subscribeToEvent(
            ContentScriptEvents.CurrentPlayingSongChanged,
            getCurrentPlayingSong
        );

        const unsubscribeFunction = () => {
            isUnsubscribed = true;
            unsubscriveToCurrentPlayingSongChanges();
        };

        return unsubscribeFunction;
    }
}

export const contentScriptApi = new ContentScriptApi();
