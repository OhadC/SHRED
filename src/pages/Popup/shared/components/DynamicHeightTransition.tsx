import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useResizeOberver, UseResizeOberverCallbackProp } from "../hooks/useResizeOberver.hook";

export const DynamicHeightTransition: React.FunctionComponent<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    const [containerSize, setContainerSize] = useState<number>(0);

    const wrapperResizeCallback: UseResizeOberverCallbackProp = useCallback((resizeObserverEntry: ResizeObserverEntry) => {
        if (resizeObserverEntry) {
            const newContainerSize = resizeObserverEntry.borderBoxSize[0].blockSize;

            setContainerSize(newContainerSize);
        }
    }, []);

    const [setTarget, setCallback] = useResizeOberver(wrapperResizeCallback);

    return (
        <WrapperContainer containerSize={containerSize} className={className}>
            <ContentContainer ref={setTarget}>{children}</ContentContainer>
        </WrapperContainer>
    );
};

const WrapperContainer = styled.div<{ containerSize: number }>`
    height: ${props => props.containerSize}px;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
`;

const ContentContainer = styled.div``;
