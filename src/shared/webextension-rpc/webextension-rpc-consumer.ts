import Browser from "webextension-polyfill";
import { DefferedPromise } from "~shared/deferred-promise";
import { RetryPromise } from "~shared/retry-promise";
import { WebextensionRpcAck, type ApiRequest, type ApiResponse } from "./webextension-rpc.model";

const ACK_RETRIES = 5;
const ACK_INTERVALS = 2_000;

export type WebextensionRpcConsumerOptions = {
    token: string;
    tabId: number;
    events?: any;
};

export class WebextensionRpcConsumer<T extends Record<string, any>> {
    private lastRequestId = 0;

    private connected = new DefferedPromise<void>();

    public readonly proxy = new Proxy<T>({} as any, {
        get: (target, prop, receiver) => {
            return async (...params: any) => {
                await this.connected;

                const request = this.wrapApiRequest(prop as string, params);

                return Browser.tabs.sendMessage(this.options.tabId, request).then((response: ApiResponse<any>) => response.data);
            };
        },
    });

    constructor(private options: WebextensionRpcConsumerOptions) {
        this.ack();
    }

    private ack() {
        new RetryPromise(
            () => {
                const request = this.wrapApiRequest(WebextensionRpcAck, undefined);

                return Browser.tabs.sendMessage(this.options.tabId, request);
            },
            {
                defferedPromise: this.connected,
                retriesCount: ACK_RETRIES,
                intervalBetweenRequests: ACK_INTERVALS,
            },
        );
    }

    private wrapApiRequest<TKey extends string, TData = any>(endpoint: TKey, data: TData): ApiRequest<TKey, TData> {
        return {
            token: this.options.token,
            endpoint,
            data,
            requestId: ++this.lastRequestId,
        };
    }
}
