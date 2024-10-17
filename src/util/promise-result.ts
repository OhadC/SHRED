import _ from "lodash";

export type PromiseResult<TData, TError = any> = [error: TError, data: null] | [error: null, data: TData];

export async function promiseResult<TData, TError = any>(promise: Promise<TData>): Promise<PromiseResult<TData, TError>> {
    try {
        return [null, await promise];
    } catch (error) {
        if (error) {
            return [error, null];
        }

        if (!_.isNil(error) && error + "" !== "") {
            return [(error + "") as any, null];
        }

        return [new Error(error) as any, null];
    }
}
