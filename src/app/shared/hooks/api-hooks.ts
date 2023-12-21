import type { Signal } from "@preact/signals-react";
import { createFacade } from "react-facade";
import type { StreamingServiceSong } from "~shared/shared-api.model";
import type { UseAsyncSignalState } from "./use-async-signal.hook";

export type ApiHooks = {
    useCurrentPlayingStreamingServiceSong: () => Signal<StreamingServiceSong>;
    useCurrentViewStreamingServiceSong: () => UseAsyncSignalState<StreamingServiceSong[]>;
};

export const [apiHooks, ApiHooksProvider] = createFacade<ApiHooks>();
