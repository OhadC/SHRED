import { getApiLogger } from "~api/api-logger";
import { DomApi } from "../helpers/dom-api";
import { type MusicStreamingApi, type MusicStreamingServiceConfig } from "./music-streaming-api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-service-configs/tidal-config";
import { SelectorBasedMusicStreamingApi } from "./selector-based-music-streaming-api/selector-based-music-streaming-api";
import type { SelectorBasedMusicStreamingServiceConfig } from "./selector-based-music-streaming-api/selector-based-music-streaming-api.model";

const logger = getApiLogger("MusicStreamingApiFactory");

const MUSIC_STREAMING_SERVICE_CONFIGS: MusicStreamingServiceConfig<any>[] = [TIDAL_CONFIG, SPOTIFY_CONFIG];

export class MusicStreamingApiFactory {
    constructor(private domApi: DomApi) {}

    public getMusicStreamingApi<ClassBasedConfig>(): MusicStreamingApi | undefined {
        const currentUrl: string = this.domApi.getCurrentUrl();

        const musicStreamingApiConfig: MusicStreamingServiceConfig<ClassBasedConfig> | undefined = MUSIC_STREAMING_SERVICE_CONFIGS.find(
            musicStreamingConfig => !!currentUrl.includes(musicStreamingConfig.urlMatch),
        );

        switch (musicStreamingApiConfig?.musicStreamingApiClass) {
            case SelectorBasedMusicStreamingApi:
                return new SelectorBasedMusicStreamingApi(
                    this.domApi,
                    musicStreamingApiConfig.classBasedConfig as SelectorBasedMusicStreamingServiceConfig,
                );

            default:
                logger.error("musicStreamingApiConfig not found.", { currentUrl });
        }
    }
}
