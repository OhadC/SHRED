import { Observable } from "rxjs";
import { onUrlChange } from "../on-url-change";

export function fromUrl(): Observable<string> {
    return new Observable(subscriber => {
        subscriber.next(location.href);

        return onUrlChange(url => subscriber.next(url));
    });
}
