import { useSignal, type ReadonlySignal } from "@preact/signals-react";
import { useEffect } from "react";

export type UseTimeoutReturn = {
    isReady: ReadonlySignal<boolean>;
};

export function useTimeout(ms?: number): UseTimeoutReturn {
    const isReady = useSignal<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            isReady.value = true;
        }, ms || 0);

        return () => clearTimeout(timer);
    }, []);

    return { isReady };
}
