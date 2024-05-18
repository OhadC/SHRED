import { sendToBackground } from "@plasmohq/messaging";
import type { BackgroundFetchRequest, BackgroundFetchResponse } from "~/background/messages/FETCH";

export async function fetchByBackground<Tdata = any>(input: NodeJS.fetch.RequestInfo, init?: RequestInit): Promise<Tdata> {
    const result = await sendToBackground<BackgroundFetchRequest, BackgroundFetchResponse>({
        name: "FETCH",
        body: { input, init },
    });

    if (result.error) {
        throw result.error;
    }

    return result.response;
}
