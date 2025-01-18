"use strict";

import { SUPPORTED_HOSTS } from "~/config/supported-hosts";


function listenToPageChangesForActionAvailability() {
    // https://developer.chrome.com/docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
    chrome.action.disable(undefined!);

    chrome.declarativeContent?.onPageChanged.removeRules(undefined, () => {
        const isSupportedSiteRules = SUPPORTED_HOSTS.map(hostSuffix => ({
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowAction()],
        }));

        chrome.declarativeContent.onPageChanged.addRules(isSupportedSiteRules);
    });
}

chrome.runtime.onInstalled.addListener(listenToPageChangesForActionAvailability);
chrome.runtime.onStartup.addListener(listenToPageChangesForActionAvailability);
