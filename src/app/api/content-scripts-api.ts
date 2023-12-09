import {
    ApiEndpoint,
    ApiEvents,
    type GetCurrentPlayingSongResponse,
    type GetCurrentViewSongsResponse,
    type StreamingServiceSong,
} from "~shared/shared-api.model";
import { browserApi } from "./browser-api";

class ContentScriptApi {
    getCurrentPlayingSongFromTab(tabId: number): Promise<StreamingServiceSong | undefined> {
        return browserApi
            .sendMessageToTab<GetCurrentPlayingSongResponse>(tabId, ApiEndpoint.GetCurrentPlayingSong)
            .then(response => response?.data);
    }

    getCurrentViewSongsFromTab(tabId: number): Promise<StreamingServiceSong[] | undefined> {
        return browserApi
            .sendMessageToTab<GetCurrentViewSongsResponse>(tabId, ApiEndpoint.GetCurrentViewSongs)
            .then(response => response?.data);
    }

    subscribeToCurrentPlayingSongFromTab(
        tabId: number,
        callback: (currentPlayingSong: StreamingServiceSong | undefined) => void,
    ): () => void {
        const getCurrentPlayingSong = () => this.getCurrentPlayingSongFromTab(tabId).then(callback);

        getCurrentPlayingSong();

        const unsubscribe = browserApi.subscribeToEvent(ApiEvents.CurrentPlayingSongChanged, getCurrentPlayingSong);

        return unsubscribe;
    }
}

export const contentScriptApi = new ContentScriptApi();
