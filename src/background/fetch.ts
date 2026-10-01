export const FETCH_MESSAGE = "SHRED_FETCH";

export type BackgroundFetchRequest = Parameters<typeof fetch>;

export type BackgroundFetchError = { message: string; status?: number };

export type BackgroundFetchResponse<TData = any> = { result: TData } | { error: BackgroundFetchError };

export type FetchMessage = { type: typeof FETCH_MESSAGE; body: BackgroundFetchRequest };

export function serveFetch() {
    chrome.runtime.onMessage.addListener((message: FetchMessage, _sender, sendResponse: (response: BackgroundFetchResponse) => void) => {
        if (message?.type !== FETCH_MESSAGE) {
            return;
        }

        fetchJson(...message.body)
            .then(result => sendResponse({ result }))
            .catch((error: Partial<BackgroundFetchError>) =>
                sendResponse({ error: { message: String(error?.message ?? error), status: error?.status } }),
            );

        return true;
    });
}

async function fetchJson(...request: BackgroundFetchRequest) {
    const response = await fetch(...request);
    if (!response.ok) {
        throw { message: `HTTP ${response.status} ${response.statusText}`, status: response.status } satisfies BackgroundFetchError;
    }

    return response.json();
}
