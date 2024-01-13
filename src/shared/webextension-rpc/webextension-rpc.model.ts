export const WebextensionRpcAck = "__WebextensionRpcAck__";

export interface ApiRequest<TKey, TData> {
    token: string;
    endpoint: TKey;
    data: TData;
    requestId: number;
}

export interface ApiResponse<TData> {
    token: string;
    data: TData;
    requestId: number;
}
