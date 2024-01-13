import { DefferedPromise } from "./deferred-promise";

export type RetryPromiseOptions<T> = {
    retriesCount?: number;
    intervalBetweenRequests?: number;
    defferedPromise?: DefferedPromise<T>;
};

export class RetryPromise<T> implements PromiseLike<T> {
    public readonly defferedPromise: DefferedPromise<T>;

    private readonly retriesCount: number;
    private readonly intervalBetweenRequests: number;

    constructor(
        private getSource: () => Promise<T>,
        options?: RetryPromiseOptions<T>,
    ) {
        this.defferedPromise = options.defferedPromise ?? new DefferedPromise<T>();
        this.retriesCount = options.retriesCount ?? 5;
        this.intervalBetweenRequests = options.retriesCount ?? 2_000;

        this.run();
    }

    public get then() {
        return this.defferedPromise.then.bind(this.defferedPromise);
    }

    private run(): void {
        let retries = 0;

        const interval = setInterval(() => {
            const currentTry = ++retries;
            if (currentTry > this.retriesCount) {
                clearInterval(interval);

                this.defferedPromise.reject("could not connect to RPC");
            }

            const isLastInterval = retries === this.retriesCount;

            this.getSource()
                .then(data => {
                    clearInterval(interval);

                    this.defferedPromise.resolve(data);
                })
                .catch(error => {
                    if (isLastInterval) {
                        this.defferedPromise.reject(error);
                    }
                });
        }, this.intervalBetweenRequests);
    }
}
