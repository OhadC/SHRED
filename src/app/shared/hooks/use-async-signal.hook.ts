import { batch, useComputed, useSignal, useSignalEffect, type ReadonlySignal } from "@preact/signals-react";
import { useRef } from "react";

export type UseAsyncSignalState<T> = {
    data: ReadonlySignal<T | undefined>;
    loading: ReadonlySignal<boolean>;
    error: ReadonlySignal<Error | undefined>;
};

export function useAsyncSignalComputed<T>(callback: () => Promise<T>): UseAsyncSignalState<T> {
    const computedCallback = useComputed(callback);

    return useAsyncSignal(computedCallback);
}

export function useAsyncSignal<T>(source: ReadonlySignal<Promise<T>>): UseAsyncSignalState<T> {
    const interation = useRef<number>(0);

    const data = useSignal<T | undefined>(undefined);
    const loading = useSignal<boolean>(true);
    const error = useSignal<Error | undefined>(undefined);

    useSignalEffect(() => {
        const currentInteration = ++interation.current;

        loading.value = true;

        source.value.then(
            value => {
                if (currentInteration !== interation.current) {
                    return;
                }

                batch(() => {
                    data.value = value;
                    loading.value = false;
                    error.value = undefined;
                });
            },
            reject => {
                if (currentInteration !== interation.current) {
                    return;
                }

                batch(() => {
                    data.value = undefined;
                    loading.value = false;
                    error.value = reject;
                });
            },
        );
    });

    return { data, loading, error };
}
