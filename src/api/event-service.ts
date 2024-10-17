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
        this.musicStreamingApi.subscribeToCurrentPlayingSongChanges(() =>
            this.sendEventMessage(ApiEvents.CurrentPlayingSongChanged, undefined),
        );
    }

    private sendEventMessage<T>(event: ApiEvents, data: T) {
        const message: ApiEventMessage<T> = { event, data };

        logger.log("sendEvent", message);

        Browser.runtime.sendMessage(message).catch(error => logger.error("sendEvent error", error));
        window.dispatchEvent(new CustomEvent(event, data));
    }
}
