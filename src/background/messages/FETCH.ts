import type { PlasmoMessaging } from "@plasmohq/messaging";
import _ from "lodash";

export type BackgroundFetchRequest = Parameters<typeof fetch>;

export type BackgroundFetchResponse<TData = any> = {
    result?: TData;
    error?: Error;
};

const resultsCache: Record<string, any> = {};

export const handler: PlasmoMessaging.MessageHandler<BackgroundFetchRequest, BackgroundFetchResponse> = (req, res) => {
    const url: string | undefined = req.body.length === 1 && _.isString(req[0]) ? (req.body[0] as string) : undefined;
    if (url && url in resultsCache) {
        return resultsCache[url];
    }

    fetch(...req.body)
        .then(response => response.json())
        .then(response => {
            resultsCache[url] = response;

            res.send({ result: response });
        })
        .catch(error => res.send({ error }));
};

export default handler;
