export interface StreamingServiceSong {
    artist?: string;
    title: string;
}

export enum ApiEndpoint {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}

export enum ApiEvents {
    CurrentPlayingSongChanged = "CurrentPlayingSongChanged",
}

export interface ApiRequest {
    endpoint: ApiEndpoint;
    data?: any;
    requestId?: string;
}

export interface ApiResponse<T> {
    data: T;
    requestId?: string;
}

export interface ApiEventMessage<T> {
    event: ApiEvents;
    data: T;
}

export type GetCurrentPlayingSongResponse = StreamingServiceSong | undefined;

export type GetCurrentViewSongsResponse = StreamingServiceSong[] | undefined;
