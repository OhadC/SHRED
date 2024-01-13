export interface StreamingServiceSong {
    artist?: string;
    title: string;
}

export type ApiService = {
    getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined>;
    getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined>;
};
export const apiServiceRpcToken = "__ApiServiceRpcToken__";

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
    requestId?: number;
}

export interface ApiResponse<T> {
    data: T;
    requestId?: number;
}

export interface ApiEventMessage<T> {
    event: ApiEvents;
    data: T;
}

export type GetCurrentPlayingSongResponse = StreamingServiceSong | undefined;

export type GetCurrentViewSongsResponse = StreamingServiceSong[] | undefined;
