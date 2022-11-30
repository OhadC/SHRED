import browser, { Runtime, Tabs } from "webextension-polyfill";
import {
    ContentScriptEndpoint,
    ContentScriptEventMessage,
    ContentScriptEvents,
    ContentScriptRequest,
    ContentScriptResponse,
} from "../../../shared/shared.model";
import { getPopupLogger } from "../util/popup-logger";

const logger = getPopupLogger("BrowserApi");

class BrowserApi {
    private nextRequestId = 1;

    getActiveTab(): Promise<Tabs.Tab> {
        return browser.tabs.query({ currentWindow: true, active: true }).then(([currentTab]) => currentTab);
    }

    sendMessageToTab<T>(tabId: number, endpoint: ContentScriptEndpoint, data?: any): Promise<ContentScriptResponse<T>> {
        const request: ContentScriptRequest = { endpoint, data, requestId: this.nextRequestId++ };

        return browser.tabs.sendMessage(tabId, request).catch(error => logger.error("sendMessageToTab error", error));
    }

    subscribeToActiveTabUrlChanges(callback: (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => void): () => void {
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

        browser.tabs.onUpdated.addListener(onUpdateCallback);
        const unsubscribeFunction = () => browser.tabs.onUpdated.removeListener(onUpdateCallback);

        return unsubscribeFunction;
    }

    subscribeToEvent<T>(
        event: ContentScriptEvents,
        callback: (eventMessage: ContentScriptEventMessage<T>, tabId: number, tab: Tabs.Tab) => void
    ): () => void {
        const onMessageCallback = (message: ContentScriptEventMessage<T>, sender: Runtime.MessageSender) => {
            if (message?.event === event && sender.tab?.active) {
                callback(message, sender.tab.id!, sender.tab);
            }
        };

        browser.runtime.onMessage.addListener(onMessageCallback);
        const unsubscribeFunction = () => browser.runtime.onMessage.removeListener(onMessageCallback);

        return unsubscribeFunction;
    }
}

export const browserApi = new BrowserApi();

/* 
 * should not use that. popup is closed when switching between tabs.
 
export function subscribeToActiveTabChange(callback: (activeInfo: browser.tabs.TabActiveInfo) => void): () => void {
    const onActivatedCallback = (activeInfo: browser.tabs.TabActiveInfo) => callback(activeInfo);

    browser.tabs.onActivated.addListener(onActivatedCallback);
    const unsubscribeFunction = () => browser.tabs.onActivated.removeListener(onActivatedCallback);

    return unsubscribeFunction;
}

export function subscribeToAnyActiveTabChange(callback: (tabId: number) => void): () => void {
    const unsubscribeToActiveTabUrlChange = subscribeToActiveTabUrlChange(callback);
    const unsubscribeToActiveTabChange = subscribeToActiveTabChange((activeInfo) => callback(activeInfo.tabId));

    const unsubscribeFunction = () => {
        unsubscribeToActiveTabUrlChange();
        unsubscribeToActiveTabChange();
    };

    return unsubscribeFunction;
}
*/
