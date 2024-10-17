import type { constructor } from "tsyringe/dist/typings/types";
import type { StreamingServiceSong } from "../api.model";

export const MusicStreamingApiToken = Symbol("MusicStreamingApiToken");
export type IMusicStreamingApi = {
    getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined>;
    getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined>;
    subscribeToCurrentPlayingSongChanges(callback: () => any): void; // no need to return unsubscribe for now
};

export const MusicStreamingClassBasedConfigToken = Symbol("MusicStreamingClassBasedConfigToken");
export type MusicStreamingServiceConfig<ClassBasedConfig> = {
    urlMatch: string;
    musicStreamingApiClass: constructor<IMusicStreamingApi>;
    classBasedConfig: ClassBasedConfig;
};
