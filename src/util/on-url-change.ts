import type { Unsubscribe } from "~/util/util.model";

// https://stackoverflow.com/a/67825703
export function onUrlChange(listener: () => any): Unsubscribe {
    let previousUrl = "";

    const observer = new MutationObserver(function (mutations) {
        if (location.href === previousUrl) {
            return;
        }

        previousUrl = location.href;

        listener();
    });

    observer.observe(document, { subtree: true, childList: true });

    return () => observer.disconnect();
}
