import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { ApiEndpoint, ApiEvents, type StreamingServiceSong } from "~/api/api.model";
import type { AsyncState } from "~/ui/models/async-state.model";
import { getUiLogger } from "~/ui/util/ui-logger";
import { ApiHooksProvider, type ApiHooksContextValue } from "../api-hooks.context";
import { BrowserProxy } from "./browser-proxy";

const logger = getUiLogger("Popup-Api-hooks");

export const BrowserBasedApiHooksProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>;
};

const apiHooks: ApiHooksContextValue = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSongs,
};

function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    return useApiState<AsyncState<StreamingServiceSong>>(
        { isPending: true },
        ApiEndpoint.GetCurrentPlayingSong,
        ApiEvents.CurrentPlayingSongChanged,
    );
}

function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    return useApiState<AsyncState<StreamingServiceSong[]>>(
        { isPending: true },
        ApiEndpoint.GetCurrentViewSongs,
        ApiEvents.CurrentViewSongsChanged,
    );
}

function useApiState<T>(initialState: T, initialStateApiEndpoint: ApiEndpoint, changeEvent: ApiEvents) {
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        (async () => {
            const currentViewSongs = await container.resolve(BrowserProxy).sendMessageToTab<T>(initialStateApiEndpoint);

            setState(currentViewSongs);
        })();

        return container.resolve(BrowserProxy).subscribeToEvent<T>(changeEvent, event => setState(event.data));
    }, [changeEvent, initialStateApiEndpoint]);

    return state;
}
