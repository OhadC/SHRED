import { useComputed } from "@preact/signals-react";
import { useTimeout } from "react-use";
import styled from "styled-components";
import { useResizeOberver } from "../hooks/useResizeOberver.hook";

type DynamicHeightTransitionProps = React.PropsWithChildren<{ className?: string; startAfterMs?: number }>;

export function DynamicHeightTransition({ children, className, startAfterMs = 200 }: DynamicHeightTransitionProps) {
    const { nodeRef, resizeObserverEntry } = useResizeOberver();

    const containerSize = useComputed(() => resizeObserverEntry.value?.borderBoxSize[0].blockSize);

    const [isReady] = useTimeout(startAfterMs ?? 0);

    return (
        <WrapperContainer $containerSize={isReady() ? containerSize.value : undefined}>
            <ContentContainer ref={nodeRef} className={className}>
                {children}
            </ContentContainer>
        </WrapperContainer>
    );
}

const WrapperContainer = styled.div<{ $containerSize: number | undefined }>`
    height: ${props => (props.$containerSize ? props.$containerSize + "px" : "intital")};
    transition: height 0.3s ease-in-out;
    overflow: hidden;
`;

const ContentContainer = styled.div`
    &::before,
    &::after {
        /* fix for case where first/last element inside ContentContainer has margin-box */
        content: "";
        display: block;
        overflow: hidden;
    }
`;
