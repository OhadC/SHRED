export type AsyncState<TData, TError = any> = {
    isPending: boolean;
    error?: TError;
    data?: TData;
};
