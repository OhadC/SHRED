import type { PlasmoMessaging } from "@plasmohq/messaging";

export type BackgroundFetchRequest = {
    input: NodeJS.fetch.RequestInfo;
    init?: RequestInit;
};

export type BackgroundFetchResponse<Tdata = any> = {
    response?: Tdata;
    error?: Error;
};

export const handler: PlasmoMessaging.MessageHandler<BackgroundFetchRequest, BackgroundFetchResponse> = (req, res) => {
    fetch(req.body.input, req.body.init)
        .then(response => response.json())
        .then(response => res.send({ response }))
        .catch(error => res.send({ error }));
};

export default handler;
