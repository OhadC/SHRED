import { inject, singleton } from "tsyringe";
import Browser from "webextension-polyfill";
import { getApiLogger } from "./api-logger";
import { ApiEvents, type ApiEventMessage } from "./api.model";
import { MusicStreamingApiToken, type IMusicStreamingApi } from "./music-streaming-api/music-streaming-api.model";

const logger = getApiLogger("EventService");

@singleton()
export class EventService {
    constructor(@inject(MusicStreamingApiToken) private readonly musicStreamingApi: IMusicStreamingApi) {}

    public init() {
        this.musicStreamingApi.currentPlayingSong$.subscribe(state => this.sendEventMessage(ApiEvents.CurrentPlayingSongChanged, state));
        this.musicStreamingApi.currentViewSongs$.subscribe(state => this.sendEventMessage(ApiEvents.CurrentViewSongsChanged, state));
    }

    private sendEventMessage<T>(event: ApiEvents, data: T) {
        const message: ApiEventMessage<T> = { event, data };

        logger.log("sendEvent", message);

        Browser.runtime.sendMessage(message).catch(error => logger.error("sendEvent error", error));

        try {
            window.dispatchEvent(new CustomEvent(event, { detail: data }));
        } catch (_e) {
            /* empty */
        }
    }
}
