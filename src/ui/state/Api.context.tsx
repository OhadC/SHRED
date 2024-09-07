import type { StreamingServiceSong } from "~/api/api.model";
import { createSafeContext } from "../util/context/create-safe-context";
import type { ReadonlyPromiseSignal } from "../util/promise-signal";

export type ApiContextValue = {
    useCurrentPlayingStreamingServiceSong: () => ReadonlyPromiseSignal<StreamingServiceSong>;
    useCurrentViewStreamingServiceSong: () => ReadonlyPromiseSignal<StreamingServiceSong[]>;
};

export const [useApiContext, ApiHooksProvider] = createSafeContext<ApiContextValue>("ApiContext");

export function useCurrentPlayingStreamingServiceSong() {
    return useApiContext().useCurrentPlayingStreamingServiceSong();
}

export function useCurrentViewStreamingServiceSong() {
    return useApiContext().useCurrentViewStreamingServiceSong();
}
