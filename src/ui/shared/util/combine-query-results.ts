import type { UseQueryResult } from "@tanstack/react-query";
import type { AsyncState } from "../models/async-state.model";

export function combineQueryResults<T>(results: UseQueryResult<T>[]): AsyncState<T[]> {
    return {
        data: results.map(result => result.data),
        error: results.find(result => result.error)?.error,
        isPending: results.some(result => result.isPending),
    };
}
