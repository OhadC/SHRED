import type { StreamingServiceSong } from "~/api/api.model";
import type { AsyncState } from "../models/async-state.model";
import { createSafeContext } from "./create-safe-context";

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
