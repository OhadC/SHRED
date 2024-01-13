export class DefferedPromise<T> implements PromiseLike<T> {
    private promise = new Promise<T>((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
    });

    private _resolve: (value: T) => void;
    private _reject: (reason?: any) => void;

    private _isDone = false;
    public get isDone(): boolean {
        return this._isDone;
    }

    private _isRejected = false;
    public get isRejected(): boolean {
        return this._isRejected;
    }

    public get then() {
        return this.promise.then.bind(this.promise);
    }

    public resolve(value: T): void {
        this._isDone = true;

        this._resolve(value);
    }

    public reject(value: any): void {
        this._isDone = true;
        this._isRejected = true;

        this._reject(value);
    }
}
