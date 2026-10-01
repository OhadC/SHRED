import { FETCH_MESSAGE, type BackgroundFetchRequest, type BackgroundFetchResponse, type FetchMessage } from "~/background/fetch";

export async function fetchByBackground<TData = any>(...body: BackgroundFetchRequest): Promise<TData> {
    const response: BackgroundFetchResponse<TData> = await chrome.runtime.sendMessage({ type: FETCH_MESSAGE, body } satisfies FetchMessage);

    if ("error" in response) {
        throw Object.assign(new Error(response.error.message), { status: response.error.status });
    }

    return response.result;
}
