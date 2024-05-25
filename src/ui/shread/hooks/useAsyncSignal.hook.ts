import { useComputed, useSignalEffect } from "@preact/signals-react";
import { useMemo } from "react";
import { PromiseSignal, type ReadonlyPromiseSignal } from "../util/promise-signal";

export function useAsyncSignalComputed<T>(callback: () => Promise<T>): ReadonlyPromiseSignal<T> {
    const computedCallback = useComputed(callback);

    const _promiseSignal = useAsyncSignal(computedCallback.value);

    useSignalEffect(() => {
        _promiseSignal.promise = computedCallback.value;
    });

    return _promiseSignal;
}

export function useAsyncSignal<T>(source: Promise<T>): PromiseSignal<T> {
    const _promiseSignal = useMemo(() => new PromiseSignal<T>(source), []);

    return _promiseSignal;
}
