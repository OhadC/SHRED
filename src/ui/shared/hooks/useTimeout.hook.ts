import { useEffect, useState } from "react";

export type UseTimeoutReturn = {
    isReady: boolean;
};

export function useTimeout(ms?: number): UseTimeoutReturn {
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, ms || 0);

        return () => clearTimeout(timer);
    }, [ms]);

    return { isReady };
}
