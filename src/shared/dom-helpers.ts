export function waitForElementToDisplay(selector: string, maxTimeoutInMs = 10 * 1000): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const startTimeInMs = Date.now();

        (function loopSearch() {
            if (document.querySelector(selector)) {
                resolve();
            } else {
                if (maxTimeoutInMs && Date.now() - startTimeInMs > maxTimeoutInMs) {
                    reject(`Could not resolve selector: ${selector}`);
                } else {
                    requestAnimationFrame(loopSearch);
                }
            }
        })();
    });
}
