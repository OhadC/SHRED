import { singleton } from "tsyringe";
import Browser, { type Runtime, type Tabs } from "webextension-polyfill";
import type { ApiEndpoint, ApiEventMessage, ApiEvents, ApiRequest, ApiResponse } from "~/api/api.model";
import { generateId } from "~/util/generate-id";
import type { Unsubscribe } from "~/util/util.model";
import { getUiLogger } from "../../../util/ui-logger";

const logger = getUiLogger("BrowserApi");

@singleton()
export class BrowserProxy {
    getActiveTab(): Promise<Tabs.Tab> {
        return Browser.tabs.query({ currentWindow: true, active: true }).then(([currentTab]) => currentTab);
    }

    sendMessageToTab<T>(tabId: number, endpoint: ApiEndpoint, data?: any): Promise<ApiResponse<T> | undefined> {
        const request: ApiRequest = { endpoint, data, requestId: generateId() };

        logger.log("sendMessageToTab", { tabId, endpoint, data });

        return Browser.tabs
            .sendMessage<ApiRequest, ApiResponse<T>>(tabId, request)
            .catch(error => logger.error("sendMessageToTab error", error) as undefined);
    }

    subscribeToActiveTabUrlChanges(
        callback: (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => void,
    ): Unsubscribe {
        let waitingForPageToComplete = false;

        const onUpdateCallback = (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
            if (tab.active) {
                if (changeInfo.status === "loading") {
                    waitingForPageToComplete = true;
                }

                if (waitingForPageToComplete && changeInfo.status === "complete") {
                    callback(tabId, changeInfo, tab);
                }
            }
        };

        Browser.tabs.onUpdated.addListener(onUpdateCallback);
        const unsubscribeFunction = () => Browser.tabs.onUpdated.removeListener(onUpdateCallback);

        return unsubscribeFunction;
    }

    subscribeToEvent<T>(event: ApiEvents, callback: (eventMessage: ApiEventMessage<T>, tabId: number, tab: Tabs.Tab) => void): Unsubscribe {
        const onMessageCallback = (message: ApiEventMessage<T>, sender: Runtime.MessageSender): undefined => {
            if (message?.event === event && sender.tab?.active) {
                callback(message, sender.tab.id!, sender.tab);
            }
        };

        Browser.runtime.onMessage.addListener(onMessageCallback);
        const unsubscribeFunction = () => Browser.runtime.onMessage.removeListener(onMessageCallback);

        return unsubscribeFunction;
    }
}
