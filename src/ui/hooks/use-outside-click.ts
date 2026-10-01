import { useCallback, useLayoutEffect, useRef, type RefCallback } from "react";

export function useOutsideClick(callback: () => void, enabled = true) {
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    return useCallback<RefCallback<HTMLElement>>(
        node => {
            const ownerDocument = node?.ownerDocument;
            if (!ownerDocument || !enabled) {
                return;
            }

            const handleClick = (event: MouseEvent) => {
                if (!node.contains(event.target as Node)) {
                    callbackRef.current();
                }
            };

            ownerDocument.addEventListener("mousedown", handleClick);

            return () => ownerDocument.removeEventListener("mousedown", handleClick);
        },
        [enabled],
    );
}
