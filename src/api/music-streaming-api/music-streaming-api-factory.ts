import { container } from "tsyringe";
import { getApiLogger } from "../api-logger";
import { DomApi } from "../helpers/dom-api";
import {
    MusicStreamingApiToken,
    MusicStreamingClassBasedConfigToken,
    type IMusicStreamingApi,
    type MusicStreamingServiceConfig,
} from "./music-streaming-api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-service-configs/tidal-config";

const logger = getApiLogger("MusicStreamingApiFactory");

container.register<IMusicStreamingApi>(MusicStreamingApiToken, {
    useFactory: container => container.resolve(getCurrentMusicStreamingApiConfig().musicStreamingApiClass),
});
container.register<any>(MusicStreamingClassBasedConfigToken, {
    useFactory: container => getCurrentMusicStreamingApiConfig().classBasedConfig,
});

const MUSIC_STREAMING_SERVICE_CONFIGS: MusicStreamingServiceConfig<any>[] = [TIDAL_CONFIG, SPOTIFY_CONFIG];
export function getCurrentMusicStreamingApiConfig(): MusicStreamingServiceConfig<any> {
    const currentUrl: string = container.resolve<DomApi>(DomApi).getCurrentUrl();

    return getMusicStreamingServiceConfigByUrl(currentUrl);
}

function getMusicStreamingServiceConfigByUrl(url: string): MusicStreamingServiceConfig<any> | undefined {
    return MUSIC_STREAMING_SERVICE_CONFIGS.find(musicStreamingConfig => !!url.includes(musicStreamingConfig.urlMatch));
}
