import { sendToBackground } from "@plasmohq/messaging";
import type { BackgroundFetchRequest, BackgroundFetchResponse } from "~/background/messages/FETCH";
import { promiseResult } from "~/util/promise-result";

export async function fetchByBackground<TData = any>(...body: BackgroundFetchRequest): Promise<TData> {
    const [error, result] = await promiseResult(
        sendToBackground<BackgroundFetchRequest, BackgroundFetchResponse>({
            name: "FETCH",
            body,
        }),
    );

    if (error || result.error) {
        throw error || result.error;
    }

    return result.result;
}
