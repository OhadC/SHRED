export function waitForFunctionToResolve<T>(callback: () => T, maxTimeoutInMs = 10 * 1000): Promise<NonNullable<T>> {
    return new Promise<NonNullable<T>>((resolve, reject) => {
        const startTimeInMs = Date.now();

        loopSearch();

        function loopSearch() {
            const result: T = callback();
            if (result != null) {
                resolve(result);
                return;
            }

            const timeoutPassed = !!maxTimeoutInMs && Date.now() - startTimeInMs > maxTimeoutInMs;
            if (timeoutPassed) {
                reject();
                return;
            }

            requestAnimationFrame(loopSearch);
        }
    });
}
