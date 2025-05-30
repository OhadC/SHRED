import type { AsyncState } from "~/ui/models/async-state.model";

export type StreamingServiceSong = {
    artist?: string;
    title: string;
};

export enum ApiEndpoint {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}

export enum ApiEvents {
    CurrentPlayingSongChanged = "CurrentPlayingSongChanged",
    CurrentViewSongsChanged = "CurrentViewSongsChanged",
}

export type ApiRequest = {
    endpoint: ApiEndpoint;
    data?: any;
    requestId?: string;
};

export type ApiResponse<T> = {
    data: T;
    requestId?: string;
};

export type ApiEventMessage<T> = {
    event: ApiEvents;
    data: T;
};

export type GetCurrentPlayingSongResponse = AsyncState<StreamingServiceSong>;

export type GetCurrentViewSongsResponse = AsyncState<StreamingServiceSong[]>;
