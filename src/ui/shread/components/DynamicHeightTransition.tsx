import { computed, useComputed } from "@preact/signals-react";
import { cn } from "~util/cn";
import { useResizeOberver } from "../hooks/useResizeOberver.hook";
import { useTimeout } from "../hooks/useTimeout.hook";

type DynamicHeightTransitionProps = React.PropsWithChildren<{ className?: string; startAfterMs?: number }>;

export function DynamicHeightTransition({ children, className, startAfterMs }: DynamicHeightTransitionProps) {
    const { nodeRef, resizeObserverEntry } = useResizeOberver();

    const containerSize = useComputed(() => resizeObserverEntry.value?.borderBoxSize[0].blockSize);

    const { isReady } = useTimeout(startAfterMs ?? 200);

    const height = computed<string>(() => (isReady.value && containerSize.value ? containerSize.value + "px" : "intital"));

    return (
        <div className="transition-all overflow-hidden" style={{ height: height.value }}>
            <div
                ref={nodeRef}
                className={cn(
                    "before:content-[''] before:block before:overflow-hidden after:block after:overflow-hidden", // fix for case where first/last element inside ContentContainer has margin-box
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
