import { computed, useComputed } from "@preact/signals-react";
import { cn } from "~/util/tailwind/cn";
import { useResizeObserver } from "../hooks/useResizeObserver.hook";
import { useTimeout } from "../hooks/useTimeout.hook";

type DynamicHeightTransitionProps = React.PropsWithChildren<{ className?: string; startAfterMs?: number }>;

export function DynamicHeightTransition({ children, className, startAfterMs }: DynamicHeightTransitionProps) {
    const { nodeRef, resizeObserverEntry } = useResizeObserver();

    const containerSize = useComputed(() => resizeObserverEntry.value?.borderBoxSize[0].blockSize);

    const { isReady } = useTimeout(startAfterMs ?? 200);

    const height = computed<string>(() => (isReady.value && containerSize.value ? containerSize.value + "px" : "initial"));

    return (
        <div className="overflow-hidden transition-all" style={{ height: height.value }}>
            <div
                ref={nodeRef}
                className={cn(
                    "before:block before:overflow-hidden before:content-[''] after:block after:overflow-hidden", // fix for case where first/last element inside ContentContainer has margin-box
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
