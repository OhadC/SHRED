import { Signal, useSignal } from "@preact/signals-react";
import { useEffect, useRef } from "react";

export type UseResizeOberverCallback = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver(): {
    nodeRef: typeof nodeRef;
    resizeObserverEntry: Signal<ResizeObserverEntry | undefined>;
} {
    const nodeRef = useRef<HTMLDivElement>(null);

    const resizeObserverEntry = useSignal<ResizeObserverEntry | undefined>(undefined);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) {
            return;
        }

        const resizeObserver = new ResizeObserver(entries => {
            resizeObserverEntry.value = entries[0];
        });

        resizeObserver.observe(node);

        return () => resizeObserver.unobserve(node);
    }, [nodeRef.current]);

    return { nodeRef, resizeObserverEntry };
}
