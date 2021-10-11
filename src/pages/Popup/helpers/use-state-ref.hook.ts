import { useCallback, useRef, useState } from "react";

// https://github.com/Aminadav/react-useStateRef/blob/master/index.js
// https://www.smashingmagazine.com/2020/11/react-useref-hook/
export function useStateRef<T>(initialState: T): [React.MutableRefObject<T>, (newState: T) => void] {
    const stateRef = useRef(initialState);
    const [, forceUpdate] = useState(); // changing stateRef.current will not trigger deep render. this will do the

    const setStateFunction = useCallback((newState: T) => {
        stateRef.current = typeof newState === "function" ? newState(stateRef.current) : stateRef;
        forceUpdate(undefined);
    }, []);

    return [stateRef, setStateFunction];
}
