import { browser } from "webextension-polyfill-ts";
import { ContentScriptEvents } from "../../shared/shared.model";
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
                this.sendEvent(ContentScriptEvents.CurrentPlayingSongChanged);
            });
            resizeObserver.observe(currentPlayingSongContainerElement);
        } catch (error) {
            logger.error("subscribeToCurrentPlayingSongChanges error", error);
        }
    }

    private sendEvent(event: ContentScriptEvents) {
        logger.log("sendEvent", { event });

        browser.runtime.sendMessage({ event }).catch((error) => logger.error("sendEvent error", error));
    }
}
