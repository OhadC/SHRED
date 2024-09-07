import { useEffect, type PropsWithChildren } from "react";
import { ApiEvents, type StreamingServiceSong } from "~/api/api.model";
import type { EndpointService } from "~/api/endpoint-service";
import { ApiHooksProvider, type ApiContextValue } from "~/ui/state/Api.context";
import { onUrlChange } from "~/util/on-url-change";
import { useAsyncSignal } from "../../../util/hooks/useAsyncSignal.hook";
import { type ReadonlyPromiseSignal } from "../../../util/promise-signal";
import { getUiLogger } from "../../../util/ui-logger";

declare let window: Window & {
    endpointService: EndpointService;
};

const logger = getUiLogger("PIP ApiHooks");

export function PipApiHooksProvider({ children }: PropsWithChildren) {
    return <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>;
}

const apiHooks: ApiContextValue = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): ReadonlyPromiseSignal<StreamingServiceSong> {
    const _promiseSignal = useAsyncSignal<StreamingServiceSong>(undefined);

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
    const _promiseSignal = useAsyncSignal<StreamingServiceSong[]>(undefined);

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
