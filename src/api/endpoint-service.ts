import { inject, singleton } from "tsyringe";
import browser, { type Runtime } from "webextension-polyfill";
import { getApiLogger } from "./api-logger";
import {
    ApiEndpoint,
    type ApiRequest,
    type ApiResponse,
    type GetCurrentPlayingSongResponse,
    type GetCurrentViewSongsResponse,
} from "./api.model";
import { MusicStreamingApiToken, type MusicStreamingApi } from "./music-streaming-api/music-streaming-api.model";

const logger = getApiLogger("EndpointService");

@singleton()
export class EndpointService {
    constructor(@inject(MusicStreamingApiToken) private readonly musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.subscribeToBrowserMessages();
    }

    private subscribeToBrowserMessages() {
        browser.runtime.onMessage.addListener((request: ApiRequest, sender: Runtime.MessageSender) => {
            logger.log("request", { request, sender });

            return this.handleEndpointRequest(request)
                .then((data: any) => {
                    const response: ApiResponse<any> = { requestId: request.requestId, data };

                    logger.log("response", { response, request });

                    return response;
                })
                .catch(error => logger.error("error", { error, request }));
        });
    }

    private handleEndpointRequest(request: ApiRequest) {
        switch (request.endpoint) {
            case ApiEndpoint.GetCurrentPlayingSong:
                return this.getCurrentPlayingSong();

            case ApiEndpoint.GetCurrentViewSongs:
                return this.getCurrentViewSongs();
        }
    }

    public getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse> {
        return this.musicStreamingApi.getCurrentPlayingSong();
    }

    public getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse> {
        return this.musicStreamingApi.getCurrentViewSongs();
    }
}
