import { sendToBackground } from "@plasmohq/messaging";
import type { BackgroundFetchRequest, BackgroundFetchResponse } from "~/background/messages/FETCH";

export async function fetchByBackground<TData = any>(...body: BackgroundFetchRequest): Promise<TData> {
    const result = await sendToBackground<BackgroundFetchRequest, BackgroundFetchResponse<TData>>({
        name: "FETCH",
        body,
    });

    if (result.error) {
        throw result.error;
    }

    return result.response;
}
