import { useEffect, useState } from "react";
import { useNodeRef } from "./useNodeRef.hook";
import { useStateRef } from "./useStateRef.hook";

export type UseResizeOberverCallbackProp = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver<T extends HTMLElement>(
    initialCallback: UseResizeOberverCallbackProp
): [(element: T | null) => void, (newState: UseResizeOberverCallbackProp) => void] {
    const [node, setNodeRef] = useNodeRef<T>();

    const [callbackRef, setCallback] = useStateRef(initialCallback);
    const [hasCallback, setHasCallback] = useState(!!callbackRef.current);
    useEffect(() => {
        setHasCallback(!!callbackRef.current);
    }, [callbackRef.current]);

    useEffect(() => {
        if (node.current && hasCallback) {
            const resizeObserver = new ResizeObserver(entries => {
                callbackRef.current(entries[0]);
            });

            resizeObserver.observe(node.current);
            const unsubscribeFunction = () => resizeObserver.unobserve(node.current!);

            return unsubscribeFunction;
        }
    }, [node.current, hasCallback]);

    return [setNodeRef, setCallback];
}
