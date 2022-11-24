import { DomApi } from "../helpers/dom-api";
import { MusicStreamingApi, MusicStreamingServiceConfig } from "./music-streaming-api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-service-configs/tidal-config";

const MUSIC_STREAMING_SERVICE_CONFIGS: MusicStreamingServiceConfig<any>[] = [TIDAL_CONFIG, SPOTIFY_CONFIG];

export class MusicStreamingApiFactory {
    constructor(private domApi: DomApi) {}

    public getMusicStreamingApi<ClassBasedConfig>(): MusicStreamingApi | undefined {
        const musicStreamingApiConfig: MusicStreamingServiceConfig<ClassBasedConfig> | undefined = MUSIC_STREAMING_SERVICE_CONFIGS.find(
            musicStreamingConfig => this.domApi.getCurrentUrl().includes(musicStreamingConfig.urlMatch)
        );

        if (musicStreamingApiConfig) {
            const musicStreamingApiClass = musicStreamingApiConfig.musicStreamingApiClass;

            return new musicStreamingApiClass(this.domApi, musicStreamingApiConfig.classBasedConfig);
        }
    }
}
