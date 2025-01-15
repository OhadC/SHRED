import { useCallback, useState } from "react";

export function useIncrementor(initialValue = 0): [value: number, increment: () => void] {
    const [value, setValue] = useState(initialValue);
    const increment = useCallback(() => setValue(value => value + 1), []);

    return [value, increment];
}
