import { singleton } from "tsyringe";
import Browser from "webextension-polyfill";
import type { ApiEndpoint, ApiEventMessage, ApiEvents, ApiRequest, ApiResponse } from "~/api/api.model";
import { generateId } from "~/util/generate-id";
import type { Unsubscribe } from "~/util/util.model";
import { getUiLogger } from "../../shared/util/ui-logger";

const logger = getUiLogger("BrowserApi");

@singleton()
export class BrowserProxy {
    private readonly activeTab = Browser.tabs.query({ currentWindow: true, active: true }).then(([currentTab]) => currentTab);

    async sendMessageToTab<T>(endpoint: ApiEndpoint, data?: any): Promise<T> {
        const request: ApiRequest = { endpoint, data, requestId: generateId() };

        logger.log("sendMessageToTab", { endpoint, data });

        const tab = await this.activeTab;
        const response = await Browser.tabs.sendMessage<ApiRequest, ApiResponse<T>>(tab.id, request);

        return response?.data;
    }

    subscribeToEvent<T>(event: ApiEvents, callback: (eventMessage: ApiEventMessage<T>) => void): Unsubscribe {
        const onMessageCallback = (message: ApiEventMessage<T>): undefined => {
            message?.event === event && callback(message);
        };

        Browser.runtime.onMessage.addListener(onMessageCallback);
        const unsubscribeFunction = () => Browser.runtime.onMessage.removeListener(onMessageCallback);

        return unsubscribeFunction;
    }
}
