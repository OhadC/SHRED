import _ from "lodash";

export function waitForFunctionToResolve<T>(callback: () => T, maxTimeoutInMs = 10 * 1000): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const startTimeInMs = Date.now();

        loopSearch();

        function loopSearch() {
            const result: T = callback();
            if (!_.isNil(result)) {
                resolve(result);
                return;
            }

            const timeoutPassed: boolean = maxTimeoutInMs && Date.now() - startTimeInMs > maxTimeoutInMs;
            if (timeoutPassed) {
                reject();
                return;
            }

            requestAnimationFrame(loopSearch);
        }
    });
}
