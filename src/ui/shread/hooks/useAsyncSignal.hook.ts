import { useComputed, useSignalEffect, type ReadonlySignal } from "@preact/signals-react";
import { useMemo } from "react";
import { PromiseSignal } from "../util/promise-signal";

export type UseAsyncSignalState<T> = Pick<PromiseSignal<T>, "data" | "loading" | "error">;

export function useAsyncSignalComputed<T>(callback: () => Promise<T>): PromiseSignal<T> {
    const computedCallback = useComputed(callback);

    return useAsyncSignal(computedCallback);
}

export function useAsyncSignal<T>(source: ReadonlySignal<Promise<T>>): PromiseSignal<T> {
    const _promiseSignal = useMemo(() => new PromiseSignal<T>(undefined), []);

    useSignalEffect(() => {
        _promiseSignal.promise = source.value;
    });

    return _promiseSignal;
}
