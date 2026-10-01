export const FETCH_MESSAGE = "SHRED_FETCH";

export type BackgroundFetchRequest = Parameters<typeof fetch>;

export type BackgroundFetchResponse<TData = any> = {
    result?: TData;
    error?: Error;
};

export type FetchMessage = { type: typeof FETCH_MESSAGE; body: BackgroundFetchRequest };

export function serveFetch() {
    chrome.runtime.onMessage.addListener((message: FetchMessage, _sender, sendResponse) => {
        if (message?.type !== FETCH_MESSAGE) {
            return;
        }

        fetch(...message.body)
            .then(response => response.json())
            .then(result => sendResponse({ result }))
            .catch(error => sendResponse({ error }));

        return true;
    });
}
