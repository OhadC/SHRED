import { useEffect, useState } from "react";
import { ApiEvents, type StreamingServiceSong } from "~/api/api.model";
import type { EndpointService } from "~/api/endpoint-service";
import type { AsyncState } from "~/ui/models/async-state.model";
import { getUiLogger } from "~/ui/util/ui-logger";
import { ApiHooksProvider, type ApiHooksContextValue } from "../api-hooks.context";

declare let window: Window & {
    endpointService: EndpointService;
};

const logger = getUiLogger("PIP ApiHooks");

export function WindowBasedApiHooksProvider({ children }: React.PropsWithChildren) {
    return <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>;
}

const apiHooks: ApiHooksContextValue = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSongs,
};

function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    return useApiState<AsyncState<StreamingServiceSong>>(
        window.endpointService.getCurrentPlayingSong(),
        ApiEvents.CurrentPlayingSongChanged,
    );
}

function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    return useApiState<AsyncState<StreamingServiceSong[]>>(window.endpointService.getCurrentViewSongs(), ApiEvents.CurrentViewSongsChanged);
}

function useApiState<T>(initialState: T, changeEvent: ApiEvents) {
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        const callback = (event: CustomEvent<T>) => {
            setState(event.detail);
        };

        window.addEventListener(changeEvent, callback);

        return () => window.removeEventListener(changeEvent, callback);
    }, [changeEvent]);

    return state;
}
