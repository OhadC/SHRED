import type { StreamingServiceSong } from "~/api/api.model";
import type { AsyncState } from "../../models/async-state.model";
import { createSafeContext } from "../../util/create-safe-context";

export type ApiHooksContextValue = {
    useCurrentPlayingStreamingServiceSong: () => AsyncState<StreamingServiceSong>;
    useCurrentViewStreamingServiceSongs: () => AsyncState<StreamingServiceSong[]>;
};

const [useApiHooksContext, ApiHooksProvider] = createSafeContext<ApiHooksContextValue>();

export { ApiHooksProvider };

export function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    return useApiHooksContext().useCurrentPlayingStreamingServiceSong();
}

export function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    return useApiHooksContext().useCurrentViewStreamingServiceSongs();
}
