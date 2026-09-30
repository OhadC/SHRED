import type { PlasmoMessaging } from "@plasmohq/messaging";

export type BackgroundFetchRequest = Parameters<typeof fetch>;

export type BackgroundFetchResponse<TData = any> = {
    result?: TData;
    error?: Error;
};

export const handler: PlasmoMessaging.MessageHandler<BackgroundFetchRequest, BackgroundFetchResponse> = (req, res) => {
    fetch(...req.body)
        .then(response => response.json())
        .then(response => res.send({ result: response }))
        .catch(error => res.send({ error }));
};

export default handler;
