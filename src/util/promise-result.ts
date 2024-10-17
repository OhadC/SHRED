export type PromiseResult<TData, TError = any> = [error: TError, data: null] | [error: null, data: TData];

export async function promiseResult<TData, TError = any>(promise: Promise<TData>): Promise<PromiseResult<TData, TError>> {
    try {
        return [null, await promise];
    } catch (error) {
        return [error, null];
    }
}
