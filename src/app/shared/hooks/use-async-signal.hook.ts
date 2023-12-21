import { batch, useComputed, useSignal, useSignalEffect, type ReadonlySignal } from "@preact/signals-react";

export type UseAsyncSignalState<T> = {
    data: ReadonlySignal<T | undefined>;
    loading: ReadonlySignal<boolean>;
    error: ReadonlySignal<Error | undefined>;
};

export function useAsyncSignalComputed<T>(callback: () => Promise<T>): UseAsyncSignalState<T> {
    return useAsyncSignal(useComputed(callback));
}

export function useAsyncSignal<T>(source: ReadonlySignal<Promise<T>>): UseAsyncSignalState<T> {
    const interation = useSignal<number>(0);

    const data = useSignal<T | undefined>(undefined);
    const loading = useSignal<boolean>(true);
    const error = useSignal<Error | undefined>(undefined);

    useSignalEffect(() => {
        let currentInteration = interation.peek();
        interation.value = ++currentInteration;

        loading.value = true;

        source.value.then(
            value =>
                batch(() => {
                    if (currentInteration !== interation.peek()) {
                        return;
                    }

                    data.value = value;
                    loading.value = false;
                    error.value = undefined;
                }),
            reject => () => {
                if (currentInteration !== interation.peek()) {
                    return;
                }

                data.value = undefined;
                loading.value = false;
                error.value = reject;
            },
        );
    });

    return { data, loading, error };
}
