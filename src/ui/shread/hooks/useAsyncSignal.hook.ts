import { useComputed, useSignalEffect, type ReadonlySignal } from "@preact/signals-react";
import { useMemo } from "react";
import { PromiseSignal, type ReadonlyPromiseSignal } from "../util/promise-signal";

export function useAsyncSignalComputed<T>(callback: () => Promise<T>): ReadonlyPromiseSignal<T> {
    const computedCallback = useComputed(callback);

    return useAsyncSignal(computedCallback);
}

export function useAsyncSignal<T>(source: ReadonlySignal<Promise<T>>): ReadonlyPromiseSignal<T> {
    const _promiseSignal = useMemo(() => new PromiseSignal<T>(undefined), []);

    useSignalEffect(() => {
        _promiseSignal.promise = source.value;
    });

    return _promiseSignal;
}
