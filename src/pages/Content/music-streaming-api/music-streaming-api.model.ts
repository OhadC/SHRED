import { StreamingServiceSong } from "../../../shared/shared.model";
import { DomApi } from "../helpers/dom-api";

export interface MusicStreamingApi {
    getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined>;
    getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined>;
    subscribeToCurrentPlayingSongChanges(callback: () => any): void; // no need to return unsubscribe for now
}

export interface MusicStreamingServiceConfig<ClassBasedConfig> {
    urlMatch: string;
    musicStreamingApiClass: MusicStreamingApiConstructor<ClassBasedConfig>;
    classBasedConfig: ClassBasedConfig;
}

export interface MusicStreamingApiConstructor<ClassBasedConfig> {
    new (domApi: DomApi, classBasedConfig: ClassBasedConfig): MusicStreamingApi;
}
