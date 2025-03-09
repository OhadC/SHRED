import { useCallback, useRef, type RefCallback } from "react";

export function useOutsideClick(callback: () => void, enabled = true) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    return useCallback<RefCallback<HTMLElement>>(
        node => {
            if (!node || !enabled) {
                return;
            }

            function handleClick(event: MouseEvent) {
                if (!node.contains(event.target as Node)) {
                    callbackRef.current();
                }
            }

            document.addEventListener("mousedown", handleClick);

            return () => document.removeEventListener("mousedown", handleClick);
        },
        [enabled],
    );
}
