import { inject, singleton } from "tsyringe";
import browser, { type Runtime } from "webextension-polyfill";
import type { AsyncState } from "~/ui/models/async-state.model";
import { getApiLogger } from "./api-logger";
import { ApiEndpoint, type ApiRequest, type ApiResponse, type StreamingServiceSong } from "./api.model";
import { MusicStreamingApiToken, type IMusicStreamingApi } from "./music-streaming-api/music-streaming-api.model";

const logger = getApiLogger("EndpointService");

@singleton()
export class EndpointService {
    constructor(@inject(MusicStreamingApiToken) private readonly musicStreamingApi: IMusicStreamingApi) {}

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

    private async handleEndpointRequest(request: ApiRequest) {
        switch (request.endpoint) {
            case ApiEndpoint.GetCurrentPlayingSong:
                return this.musicStreamingApi.currentPlayingSongState;

            case ApiEndpoint.GetCurrentViewSongs:
                return this.musicStreamingApi.currentViewSongsState;
        }
    }

    public getCurrentPlayingSong(): AsyncState<StreamingServiceSong> {
        return this.musicStreamingApi.currentPlayingSongState;
    }

    public getCurrentViewSongs(): AsyncState<StreamingServiceSong[]> {
        return this.musicStreamingApi.currentViewSongsState;
    }
}
