import { batch, signal, type ReadonlySignal } from "@preact/signals-react";

export function promiseSignal<T>(promise: Promise<T>): PromiseSignal<T> {
    return new PromiseSignal(promise);
}

export class PromiseSignal<T> {
    private _promise: Promise<T>;

    private readonly _data = signal<T | undefined>(undefined);
    public readonly data: ReadonlySignal<T | undefined> = this._data;

    private readonly _loading = signal<boolean>(false);
    public readonly loading: ReadonlySignal<boolean> = this._loading;

    private readonly _error = signal<Error | undefined>(undefined);
    public readonly error: ReadonlySignal<Error | undefined> = this._error;

    constructor(promise: Promise<T>) {
        this.promise = promise;
    }

    public get promise(): Promise<T> {
        return this._promise;
    }

    public set promise(newPromise: Promise<T>) {
        if (newPromise === this.promise) {
            return;
        }

        this._promise = newPromise;

        this.handlePromiseChange();
    }

    private handlePromiseChange(): void {
        if (!this._promise) {
            batch(() => {
                this._data.value = undefined;
                this._loading.value = false;
                this._error.value = undefined;
            });

            return;
        }

        batch(() => {
            this._data.value = undefined;
            this._loading.value = true;
            this._error.value = undefined;
        });

        const awaitedPromise: Promise<T> = this.promise;

        this.promise.then(
            data => {
                if (this._promise !== awaitedPromise) {
                    return;
                }

                batch(() => {
                    this._data.value = data;
                    this._loading.value = false;
                });
            },
            error => {
                if (this._promise !== awaitedPromise) {
                    return;
                }

                batch(() => {
                    this._loading.value = false;
                    this._error.value = error;
                });
            },
        );
    }
}
