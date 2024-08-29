import type { PlasmoMessaging } from "@plasmohq/messaging";

export type BackgroundFetchRequest = Parameters<typeof fetch>;

export type BackgroundFetchResponse<TData = any> = {
    response?: TData;
    error?: Error;
};

export const handler: PlasmoMessaging.MessageHandler<BackgroundFetchRequest, BackgroundFetchResponse> = (req, res) => {
    fetch(...req.body)
        .then(response => response.json())
        .then(response => res.send({ response }))
        .catch(error => res.send({ error }));
};

export default handler;
