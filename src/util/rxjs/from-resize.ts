import { Observable } from "rxjs";

export function fromResize(node: Element) {
    return new Observable<ResizeObserverEntry>(subscriber => {
        const resizeObserver = new ResizeObserver(entries => {
            subscriber.next(entries[0]);
        });

        resizeObserver.observe(node);

        return () => resizeObserver.unobserve(node);
    });
}
