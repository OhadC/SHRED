import { Signal } from "@preact/signals-react";
import { useEffect, useRef } from "react";

export type UseResizeOberverCallback = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver(): {
    nodeRef: typeof nodeRef;
    resizeObserverEntry: Signal<ResizeObserverEntry | undefined>;
} {
    const nodeRef = useRef(null);

    const resizeObserverEntry = new Signal<ResizeObserverEntry | undefined>(undefined);

    useEffect(() => {
        if (!nodeRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(entries => {
            resizeObserverEntry.value = entries[0];
        });

        resizeObserver.observe(nodeRef.current);

        return () => resizeObserver.unobserve(nodeRef.current!);
    }, [nodeRef.current]);

    return { nodeRef, resizeObserverEntry: resizeObserverEntry };
}
