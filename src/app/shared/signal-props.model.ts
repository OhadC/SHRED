import type { ReadonlySignal } from "@preact/signals-react";

export type SignalProps<T extends {}> = {
    [Key in keyof T]: ReadonlySignal<T[Key]>;
};
