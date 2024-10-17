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

export type GetCurrentPlayingSongResponse = StreamingServiceSong | undefined;

export type GetCurrentViewSongsResponse = StreamingServiceSong[] | undefined;
