import _ from "lodash";

export type PromiseResult<TData, TError = Error> = [error: TError, data: null] | [error: null, data: TData];

/**
 * @description
 *  returns a tuple of error and result of the promise
 * @example
 * const [error, result] = await promiseResult(somePromise);
 */
export async function promiseResult<TData, TError = Error>(promise: Promise<TData>): Promise<PromiseResult<Awaited<TData>, TError>> {
    try {
        const result = await promise;

        return [null, result];
    } catch (error) {
        if (_.isNil(error)) {
            return [new Error() as TError, null];
        }

        if (!error) {
            return ["" + error || (new Error(error as any) as any), null];
        }

        return [error, null];
    }
}
