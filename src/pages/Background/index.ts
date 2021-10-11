const SUPPORTED_URLS = [".spotify.com", ".tidal.com"];

// https://developer.chrome.com/docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable(undefined!);

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        const isSupportedSiteRules = SUPPORTED_URLS.map((hostSuffix) => ({
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()],
        }));

        chrome.declarativeContent.onPageChanged.addRules(isSupportedSiteRules);
    });
});
