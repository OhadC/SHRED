import type { Observable } from "rxjs";
import type { constructor } from "tsyringe/dist/typings/types";
import type { AsyncState } from "~/ui/models/async-state.model";
import type { StreamingServiceSong } from "../api.model";

export const MusicStreamingApiToken = Symbol("MusicStreamingApiToken");
export type IMusicStreamingApi = {
    currentPlayingSong$: Observable<AsyncState<StreamingServiceSong>>;
    currentViewSongs$: Observable<AsyncState<StreamingServiceSong[]>>;
    currentPlayingSongState: AsyncState<StreamingServiceSong>;
    currentViewSongsState: AsyncState<StreamingServiceSong[]>;
};

export const MusicStreamingClassBasedConfigToken = Symbol("MusicStreamingClassBasedConfigToken");
export type MusicStreamingServiceConfig<ClassBasedConfig> = {
    urlMatch: string;
    musicStreamingApiClass: constructor<IMusicStreamingApi>;
    classBasedConfig: ClassBasedConfig;
};
