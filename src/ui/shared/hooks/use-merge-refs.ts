// Taken from https://github.com/gregberge/react-merge-refs/issues/36

import { useCallback, type Ref, type RefCallback } from "react";

export function useMergeRefs<T>(...refs: Ref<T>[]): Ref<T> {
    return useCallback<RefCallback<T>>(
        value => {
            const cleanups = refs.reduce<VoidFunction[]>((accumulator, ref) => {
                if (typeof ref === "function") {
                    const cleanup = ref(value);
                    if (typeof cleanup === "function") {
                        accumulator.push(cleanup);
                    }
                } else if (ref) {
                    ref.current = value;
                }

                return accumulator;
            }, []);

            return () => {
                cleanups.forEach(cleanup => cleanup());
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    );
}
