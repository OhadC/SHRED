import Browser from "webextension-polyfill";
import { ApiEvents, type ApiEventMessage } from "~shared/shared-api.model";
import { getApiLogger } from "./api-logger";
import { type MusicStreamingApi } from "./music-streaming-api/music-streaming-api.model";

const logger = getApiLogger("EventService");

export class EventService {
    constructor(private musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.musicStreamingApi.subscribeToCurrentPlayingSongChanges(() =>
            this.sendEventMessage(ApiEvents.CurrentPlayingSongChanged, undefined),
        );
    }

    private sendEventMessage<T>(event: ApiEvents, data: T) {
        const message: ApiEventMessage<T> = { event, data };

        logger.log("sendEvent", message);
        Browser.runtime.sendMessage(message).catch(error => logger.error("sendEvent error", error));
    }
}
