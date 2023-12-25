import type { constructor } from "tsyringe/dist/typings/types";
import type { StreamingServiceSong } from "~shared/shared-api.model";

export const MusicStreamingApiToken = Symbol("MusicStreamingApiToken");
export interface MusicStreamingApi {
    getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined>;
    getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined>;
    subscribeToCurrentPlayingSongChanges(callback: () => any): void; // no need to return unsubscribe for now
}

export const MusicStreamingClassBasedConfigToken = Symbol("MusicStreamingClassBasedConfigToken");
export interface MusicStreamingServiceConfig<ClassBasedConfig> {
    urlMatch: string;
    musicStreamingApiClass: constructor<MusicStreamingApi>;
    classBasedConfig: ClassBasedConfig;
}
