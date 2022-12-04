import { useRef, useCallback } from "react";

// https://github.com/omrirz/dnd-kit/blob/master/packages/core/src/hooks/useDraggable.ts

export function useNodeRef<T extends HTMLElement>() {
    const node = useRef<T | null>(null);
    const setNodeRef = useCallback((element: T | null) => {
        node.current = element;
    }, []);

    return [node, setNodeRef] as const;
}
