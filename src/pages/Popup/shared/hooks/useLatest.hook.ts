import { useRef } from "react";

export function useLatest<T>(latestState: T): React.MutableRefObject<T> {
    const stateRef = useRef(latestState);

    stateRef.current = latestState;

    return stateRef;
}
