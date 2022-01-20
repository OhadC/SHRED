import { browser } from "webextension-polyfill-ts";
import { ContentScriptEventMessage, ContentScriptEvents } from "../../shared/shared.model";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";
import { getContentScriptLogger } from "./util/content-script-logger";

const logger = getContentScriptLogger("EventService");

export class EventService {
    constructor(private musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.subscribeToCurrentPlayingSongChanges();
    }

    private async subscribeToCurrentPlayingSongChanges() {
        try {
            const currentPlayingSongContainerElement = await this.musicStreamingApi.getCurrentPlayingSongContainerElement();
            if (!currentPlayingSongContainerElement) {
                return;
            }

            const resizeObserver = new ResizeObserver((entries) => {
                this.sendEventMessage(ContentScriptEvents.CurrentPlayingSongChanged, undefined);
            });
            resizeObserver.observe(currentPlayingSongContainerElement);
        } catch (error) {
            logger.error("subscribeToCurrentPlayingSongChanges error", error);
        }
    }

    private sendEventMessage<T>(event: ContentScriptEvents, data: T) {
        const message: ContentScriptEventMessage<T> = { event, data };

        logger.log("sendEvent", message);
        browser.runtime.sendMessage(message).catch((error) => logger.error("sendEvent error", error));
    }
}
