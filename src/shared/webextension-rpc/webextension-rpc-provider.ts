import type { Runtime } from "webextension-polyfill";
import Browser from "webextension-polyfill";
import type { PickFunctionKeys } from "~shared/util.model";
import { WebextensionRpcAck, type ApiRequest, type ApiResponse } from "./webextension-rpc.model";

export type WebextensionRpcProviderOptions<T extends Record<string, any>> = {
    token: string;
    implementation: T;
    events?: any;
};

export class WebextensionRpcProvider<T extends Record<string, any>> {
    constructor(private options: WebextensionRpcProviderOptions<T>) {
        this.subscribeToEvents();
    }

    public dispose() {
        Browser.runtime.onMessage.removeListener(this.requestHandler);
    }

    private subscribeToEvents() {
        Browser.runtime.onMessage.addListener(this.requestHandler);
    }

    private requestHandler = <K extends PickFunctionKeys<T>>(request: ApiRequest<K, Parameters<T[K]>>, sender: Runtime.MessageSender) => {
        if (this.options.token !== request?.token) {
            return;
        }

        if (request.endpoint === WebextensionRpcAck) {
            return Promise.resolve(this.wrapApiResponse(WebextensionRpcAck, request.requestId));
        }

        return this.options.implementation[request.endpoint](request.data).then(data => this.wrapApiResponse(data, request.requestId));
    };

    private wrapApiResponse<T = any>(data: T, requestId: number): ApiResponse<T> {
        return { token: this.options.token, data, requestId };
    }
}
