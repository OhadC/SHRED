import { browser, Runtime } from "webextension-polyfill-ts";
import {
    ContentScriptEndpoint,
    ContentScriptRequest,
    ContentScriptResponse,
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
} from "../../shared/shared.model";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api.model";
import { getContentScriptLogger } from "./util/content-script-logger";

const logger = getContentScriptLogger("EndpointService");

export class EndpointService {
    constructor(private musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.subscribeToBrowserMessages();
    }

    private subscribeToBrowserMessages() {
        browser.runtime.onMessage.addListener((request: ContentScriptRequest, sender: Runtime.MessageSender) => {
            logger.log("request", { request, sender });

            return this.handleEndpointRequest(request)
                .then((data: any) => {
                    const response: ContentScriptResponse<any> = { requestId: request.requestId, data };

                    logger.log("response", { response, request });

                    return response;
                })
                .catch(error => logger.error("error", { error, request }));
        });
    }

    private handleEndpointRequest(request: ContentScriptRequest) {
        switch (request.endpoint) {
            case ContentScriptEndpoint.GetCurrentPlayingSong:
                return this.getCurrentPlayingSong();

            case ContentScriptEndpoint.GetCurrentViewSongs:
                return this.getCurrentViewSongs();
        }
    }

    private getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse> {
        return this.musicStreamingApi.getCurrentPlayingSong();
    }

    private getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse> {
        return this.musicStreamingApi.getCurrentViewSongs();
    }
}
