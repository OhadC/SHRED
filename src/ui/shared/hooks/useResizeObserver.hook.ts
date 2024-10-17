import { useEffect, useRef, useState } from "react";

export type UseResizeObserverCallback = (resizeObserverEntry: ResizeObserverEntry) => void;

export type UseResizeObserverReturn = {
    nodeRef: ReturnType<typeof useRef<HTMLDivElement>>;
    resizeObserverEntry: ResizeObserverEntry | undefined;
};

export function useResizeObserver(): UseResizeObserverReturn {
    const nodeRef = useRef<HTMLDivElement>(null);

    const [resizeObserverEntry, setResizeObserverEntry] = useState<ResizeObserverEntry | undefined>(undefined);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) {
            return;
        }

        const resizeObserver = new ResizeObserver(entries => {
            setResizeObserverEntry(entries[0]);
        });

        resizeObserver.observe(node);

        return () => resizeObserver.unobserve(node);
    }, [nodeRef.current]);

    return { nodeRef, resizeObserverEntry };
}
