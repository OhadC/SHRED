import type { StreamingServiceSong } from "~/api/api.model";
import { createSafeContext } from "~/util/context/create-safe-context";
import type { AsyncState } from "../models/async-state.model";

export type ApiContextValue = {
    useCurrentPlayingStreamingServiceSong: () => AsyncState<StreamingServiceSong>;
    useCurrentViewStreamingServiceSongs: () => AsyncState<StreamingServiceSong[]>;
};

export const [useApiContext, ApiHooksProvider] = createSafeContext<ApiContextValue>();

export function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    return useApiContext().useCurrentPlayingStreamingServiceSong();
}

export function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    return useApiContext().useCurrentViewStreamingServiceSongs();
}
