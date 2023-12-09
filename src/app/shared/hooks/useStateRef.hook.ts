import { useCallback, useRef, useState, type SetStateAction } from "react";

const isFunction = <S>(setStateAction: SetStateAction<S>): setStateAction is (prevState: S) => S => typeof setStateAction === "function";

// https://github.com/Aminadav/react-useStateRef/blob/master/index.ts
// https://www.smashingmagazine.com/2020/11/react-useref-hook/
export function useStateRef<S>(initialState: S): [S, (newState: S) => void, Readonly<React.MutableRefObject<S>>] {
    const [state, setState] = useState(initialState); // changing stateRef.current will not trigger deep render. this will do the job
    const stateRef = useRef(initialState);

    const setStateFunction = useCallback((newState: S) => {
        stateRef.current = isFunction(newState) ? newState(stateRef.current) : newState;
        setState(stateRef.current);
    }, []);

    return [state, setStateFunction, stateRef];
}
