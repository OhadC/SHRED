import _ from "lodash";
import { useCallback, useState } from "react";

export function useIsSticky() {
    const [isSticky, setIsSticky] = useState(false);

    const isStickyRef = useCallback((node: HTMLElement | null) => {
        if (!node) {
            return;
        }

        const scrollParent = getScrollParent(node);

        let requestedAnimationFrame: number | undefined;

        const handleScroll = () => {
            if (requestedAnimationFrame) {
                return;
            }

            requestedAnimationFrame = requestAnimationFrame(() => {
                setIsSticky(isInStickyState(node, scrollParent));

                requestedAnimationFrame = undefined;
            });
        };

        scrollParent.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll(); // Check initial state

        return () => {
            scrollParent.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return { isStickyRef, isSticky };
}

function getScrollParent(element: HTMLElement | null): HTMLElement {
    while (element && element !== document.body) {
        const overflow = window.getComputedStyle(element).overflowY;
        if (overflow === "auto" || overflow === "scroll") {
            return element;
        }

        element = element.parentElement;
    }

    return document.body;
}

function isInStickyState(node: HTMLElement, parent: HTMLElement) {
    const parentRect = parent.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    return nodeRect.top <= parentRect.top;
}
