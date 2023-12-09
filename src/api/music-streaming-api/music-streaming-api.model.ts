import { type StreamingServiceSong } from "~shared/shared-api.model";
import type { ConcreteClass } from "~shared/util.model";

export interface MusicStreamingApi {
    getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined>;
    getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined>;
    subscribeToCurrentPlayingSongChanges(callback: () => any): void; // no need to return unsubscribe for now
}

export interface MusicStreamingServiceConfig<ClassBasedConfig> {
    urlMatch: string;
    musicStreamingApiClass: ConcreteClass<MusicStreamingApi>;
    classBasedConfig: ClassBasedConfig;
}
