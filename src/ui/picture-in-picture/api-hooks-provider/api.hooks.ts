import { useEffect, useMemo } from "react";
import { ApiEvents, type StreamingServiceSong } from "~/api/api.model";
import type { EndpointService } from "~/api/endpoint-service";
import { onUrlChange } from "~/util/on-url-change";
import type { ApiHooks } from "../../shread/hooks/apiHooks.hook";
import { PromiseSignal, type ReadonlyPromiseSignal } from "../../shread/util/promise-signal";
import { getUiLogger } from "../../shread/util/ui-logger";

declare let window: Window & {
    endpointService: EndpointService;
};

const logger = getUiLogger("PIP ApiHooks");

export const apiHooks: ApiHooks = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): ReadonlyPromiseSignal<StreamingServiceSong> {
    const _promiseSignal = useMemo(() => new PromiseSignal<StreamingServiceSong>(undefined), []);

    useEffect(() => {
        const updateCurrentPlayingSong = () => (_promiseSignal.promise = window.endpointService.getCurrentPlayingSong());

        window.addEventListener(ApiEvents.CurrentPlayingSongChanged, updateCurrentPlayingSong);

        updateCurrentPlayingSong();

        return () => {
            window.removeEventListener(ApiEvents.CurrentPlayingSongChanged, updateCurrentPlayingSong);
        };
    }, []);

    return _promiseSignal;
}

function useCurrentViewStreamingServiceSong(): ReadonlyPromiseSignal<StreamingServiceSong[]> {
    const _promiseSignal = useMemo(() => new PromiseSignal<StreamingServiceSong[]>(undefined), []);

    useEffect(() => {
        const updateCurrentViewSongs = () => (_promiseSignal.promise = window.endpointService.getCurrentViewSongs());

        const unsubscribe = onUrlChange(updateCurrentViewSongs);

        updateCurrentViewSongs();

        return () => {
            unsubscribe();
        };
    }, []);

    return _promiseSignal;
}
