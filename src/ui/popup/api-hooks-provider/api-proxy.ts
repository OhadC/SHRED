import { inject, singleton } from "tsyringe";
import {
    ApiEndpoint,
    ApiEvents,
    type GetCurrentPlayingSongResponse,
    type GetCurrentViewSongsResponse,
    type StreamingServiceSong,
} from "~api/api.model";
import { BrowserProxy } from "./browser-proxy";

@singleton()
export class ApiProxy {
    constructor(@inject(BrowserProxy) private browserProxy: BrowserProxy) {}

    public getCurrentPlayingSongFromTab(tabId: number): Promise<StreamingServiceSong | undefined> {
        return this.browserProxy
            .sendMessageToTab<GetCurrentPlayingSongResponse>(tabId, ApiEndpoint.GetCurrentPlayingSong)
            .then(response => response?.data);
    }

    public getCurrentViewSongsFromTab(tabId: number): Promise<StreamingServiceSong[] | undefined> {
        return this.browserProxy
            .sendMessageToTab<GetCurrentViewSongsResponse>(tabId, ApiEndpoint.GetCurrentViewSongs)
            .then(response => response?.data);
    }

    subscribeToCurrentPlayingSongFromTab(
        tabId: number,
        callback: (currentPlayingSong: StreamingServiceSong | undefined) => void,
    ): () => void {
        const getCurrentPlayingSong = () => this.getCurrentPlayingSongFromTab(tabId).then(callback);

        getCurrentPlayingSong();

        const unsubscribe = this.browserProxy.subscribeToEvent(ApiEvents.CurrentPlayingSongChanged, getCurrentPlayingSong);

        return unsubscribe;
    }
}
