import { FETCH_MESSAGE, type BackgroundFetchRequest, type BackgroundFetchResponse, type FetchMessage } from "~/background/fetch";
import { promiseResult } from "~/util/promise-result";

export async function fetchByBackground<TData = any>(...body: BackgroundFetchRequest): Promise<TData> {
    const [error, result] = await promiseResult<BackgroundFetchResponse<TData>>(
        chrome.runtime.sendMessage({ type: FETCH_MESSAGE, body } satisfies FetchMessage),
    );

    if (error || result.error) {
        throw error || result.error;
    }

    return result.result;
}
