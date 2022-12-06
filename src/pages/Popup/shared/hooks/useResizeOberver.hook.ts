import { useEffect } from "react";
import { useStateRef } from "./useStateRef.hook";

export type UseResizeOberverCallback = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver<T extends HTMLElement>(
    initialCallback: UseResizeOberverCallback
): { setNodeRef: (element: T | null) => void; setCallback: (newState: UseResizeOberverCallback) => void } {
    const [, setNodeRef, nodeRef] = useStateRef<T | null>(null);
    const [, setCallback, callbackRef] = useStateRef<UseResizeOberverCallback>(initialCallback);

    const hasCallback = !!callbackRef.current;

    useEffect(() => {
        if (nodeRef.current && hasCallback) {
            const resizeObserver = new ResizeObserver(entries => {
                callbackRef.current!(entries[0]);
            });

            resizeObserver.observe(nodeRef.current);
            const unsubscribeFunction = () => resizeObserver.unobserve(nodeRef.current!);

            return unsubscribeFunction;
        }
    }, [nodeRef.current, hasCallback]);

    return { setNodeRef, setCallback };
}
