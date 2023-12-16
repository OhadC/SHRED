import { singleton } from "tsyringe";
import Browser, { type Runtime, type Tabs } from "webextension-polyfill";
import { getPopupLogger } from "~popup/popup-logger";
import type { ApiEndpoint, ApiEventMessage, ApiEvents, ApiRequest, ApiResponse } from "~shared/shared-api.model";
import type { Unsubscribe } from "~shared/util.model";

const logger = getPopupLogger("BrowserApi");

@singleton()
export class BrowserProxy {
    private nextRequestId = 1;

    getActiveTab(): Promise<Tabs.Tab> {
        return Browser.tabs.query({ currentWindow: true, active: true }).then(([currentTab]) => currentTab);
    }

    sendMessageToTab<T>(tabId: number, endpoint: ApiEndpoint, data?: any): Promise<ApiResponse<T>> {
        const request: ApiRequest = { endpoint, data, requestId: this.nextRequestId++ };

        return Browser.tabs.sendMessage(tabId, request).catch(error => logger.error("sendMessageToTab error", error));
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
        const onMessageCallback = (message: ApiEventMessage<T>, sender: Runtime.MessageSender) => {
            if (message?.event === event && sender.tab?.active) {
                callback(message, sender.tab.id!, sender.tab);
            }
        };

        Browser.runtime.onMessage.addListener(onMessageCallback);
        const unsubscribeFunction = () => Browser.runtime.onMessage.removeListener(onMessageCallback);

        return unsubscribeFunction;
    }
}
