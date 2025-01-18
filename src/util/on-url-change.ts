import type { Unsubscribe } from "~/util/util.model";

// https://stackoverflow.com/a/67825703
export function onUrlChange(listener: (url: string) => any): Unsubscribe {
    let previousUrl = location.href;

    const observer = new MutationObserver(function () {
        if (location.href === previousUrl) {
            return;
        }

        previousUrl = location.href;

        listener(location.href);
    });

    observer.observe(document, { subtree: true, childList: true });

    return () => observer.disconnect();
}
