import type React from "react";
import { createContext, useContext } from "react";

const CONTEXT_NOT_PROVIDED = Symbol("CONTEXT_NOT_PROVIDED");

export function createSafeContext<T>(): [() => T, React.Provider<T>] {
    const Context = createContext<T | typeof CONTEXT_NOT_PROVIDED>(CONTEXT_NOT_PROVIDED);

    const useSafeContext = () => {
        const contextData = useContext(Context);

        if (contextData === CONTEXT_NOT_PROVIDED) {
            throw new Error("useContext was called without providing it first");
        }

        return contextData;
    };

    return [useSafeContext, Context.Provider as React.Provider<T>];
}
