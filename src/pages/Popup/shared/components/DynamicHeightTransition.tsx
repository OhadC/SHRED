import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useResizeOberver, UseResizeOberverCallback } from "../hooks/useResizeOberver.hook";

type DynamicHeightTransitionProps = React.PropsWithChildren<{ className?: string; startAfterMs?: number }>;

export const DynamicHeightTransition = ({ children, className, startAfterMs = 200 }: DynamicHeightTransitionProps) => {
    const [containerSize, setContainerSize] = useState<number>(0);

    const wrapperResizeCallback: UseResizeOberverCallback = useCallback((resizeObserverEntry: ResizeObserverEntry) => {
        if (resizeObserverEntry) {
            const newContainerSize = resizeObserverEntry.borderBoxSize[0].blockSize;

            setContainerSize(newContainerSize);
        }
    }, []);

    const { setNodeRef } = useResizeOberver(wrapperResizeCallback);

    const [contentRendered, setContentRendered] = useState<boolean>(false);
    useEffect(() => {
        const timer = setTimeout(() => setContentRendered(true), startAfterMs ?? 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <WrapperContainer containerSize={contentRendered ? containerSize : undefined}>
            <ContentContainer ref={setNodeRef} className={className}>
                {children}
            </ContentContainer>
        </WrapperContainer>
    );
};

const WrapperContainer = styled.div<{ containerSize: number | undefined }>`
    height: ${props => (props.containerSize ? props.containerSize + "px" : "intital")};
    transition: height 0.3s ease-in-out;
    overflow: hidden;
`;

const ContentContainer = styled.div``;
