import { sendToBackground } from "@plasmohq/messaging";
import _ from "lodash";
import type { BackgroundFetchRequest, BackgroundFetchResponse } from "~/background/messages/FETCH";
import { promiseResult } from "~/util/promise-result";

const resultsCache: Record<string, any> = {};

export async function fetchByBackground<TData = any>(...body: BackgroundFetchRequest): Promise<TData> {
    const shouldUseCache = body.length === 1 && _.isString(body[0]);
    if (shouldUseCache && (body[0] as string) in resultsCache) {
        return resultsCache[body[0] as string];
    }

    const [error, result] = await promiseResult(
        sendToBackground<BackgroundFetchRequest, BackgroundFetchResponse>({
            name: "FETCH",
            body,
        }),
    );

    if (error || result.error) {
        throw error || result.error;
    }

    resultsCache[body[0] as string] = result.result;

    return result.result;
}
