import { Observable } from "rxjs";

export function fromMutation(node: Node, options?: MutationObserverInit) {
    return new Observable(subscriber => {
        const mutationObserver = new MutationObserver(mutations => {
            subscriber.next(mutations);
        });

        mutationObserver.observe(node, options);

        return () => mutationObserver.disconnect();
    });
}
