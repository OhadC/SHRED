import { container } from "tsyringe";
import { getApiLogger } from "../api-logger";
import {
    MusicStreamingApiToken,
    MusicStreamingClassBasedConfigToken,
    type IMusicStreamingApi,
    type MusicStreamingServiceConfig,
} from "./music-streaming-api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-service-configs/tidal-config";
import { YOUTUBE_MUSIC_CONFIG } from "./music-streaming-service-configs/youtube-music-config";

const logger = getApiLogger("MusicStreamingApiFactory");

const MUSIC_STREAMING_SERVICE_CONFIGS: MusicStreamingServiceConfig<any>[] = [TIDAL_CONFIG, SPOTIFY_CONFIG, YOUTUBE_MUSIC_CONFIG];

container.register<IMusicStreamingApi>(MusicStreamingApiToken, {
    useFactory: container => container.resolve(getCurrentMusicStreamingApiConfig()?.musicStreamingApiClass),
});
container.register<any>(MusicStreamingClassBasedConfigToken, {
    useFactory: () => getCurrentMusicStreamingApiConfig()?.classBasedConfig,
});

export function getCurrentMusicStreamingApiConfig(): MusicStreamingServiceConfig<any> {
    return getMusicStreamingServiceConfigByUrl(document.URL);
}

function getMusicStreamingServiceConfigByUrl(url: string): MusicStreamingServiceConfig<any> | undefined {
    return MUSIC_STREAMING_SERVICE_CONFIGS.find(musicStreamingConfig => !!url.includes(musicStreamingConfig.urlMatch));
}
