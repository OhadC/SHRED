import type { Signal } from "@preact/signals-react";
import { createFacade } from "react-facade";
import type { StreamingServiceSong } from "~api/api.model";
import type { UseAsyncSignalState } from "~ui/shread/hooks/useAsyncSignal.hook";

export type ApiHooks = {
    useCurrentPlayingStreamingServiceSong: () => Signal<StreamingServiceSong>;
    useCurrentViewStreamingServiceSong: () => UseAsyncSignalState<StreamingServiceSong[]>;
};

export const [apiHooks, ApiHooksProvider] = createFacade<ApiHooks>();
