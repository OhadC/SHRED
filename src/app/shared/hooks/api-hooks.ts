import { createFacade } from "react-facade";
import type { AsyncState } from "react-use/lib/useAsyncFn";
import type { StreamingServiceSong } from "~shared/shared-api.model";

type ApiHooks = {
    useCurrentPlayingStreamingServiceSong: () => StreamingServiceSong;
    useCurrentViewStreamingServiceSong: () => AsyncState<StreamingServiceSong[]>;
};

export const [apiHooks, ApiHooksProvider] = createFacade<ApiHooks>();
