// Taken from https://dev.to/rensjaspers/beginners-guide-loading-data-based-on-changes-to-other-data-in-angular-106k

import { catchError, map, of, startWith, switchMap, type Observable, type OperatorFunction } from "rxjs";
import type { AsyncState } from "~/ui/shared/models/async-state.model";

export function switchMapAsyncState<T, R>(observableFunction: (value: T) => Observable<R>): OperatorFunction<T, AsyncState<R>> {
    return (source: Observable<T>) =>
        source.pipe(
            switchMap<T, Observable<AsyncState<R>>>(value =>
                observableFunction(value).pipe(
                    map(data => ({ data, isPending: false })),
                    catchError(error => of({ error, isPending: false })),
                    startWith({ error: null, isPending: true }),
                ),
            ),
        );
}
