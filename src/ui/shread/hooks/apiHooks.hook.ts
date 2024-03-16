import { createFacade } from "react-facade";
import type { StreamingServiceSong } from "~api/api.model";
import type { ReadonlyPromiseSignal } from "../util/promise-signal";

export type ApiHooks = {
    useCurrentPlayingStreamingServiceSong: () => ReadonlyPromiseSignal<StreamingServiceSong>;
    useCurrentViewStreamingServiceSong: () => ReadonlyPromiseSignal<StreamingServiceSong[]>;
};

export const [apiHooks, ApiHooksProvider] = createFacade<ApiHooks>();
