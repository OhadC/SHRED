import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiEvents, type StreamingServiceSong } from "~/api/api.model";
import type { EndpointService } from "~/api/endpoint-service";
import { ApiHooksProvider, type ApiContextValue } from "~/ui/shared/contexts/Api.context";
import { useIncrementor } from "~/ui/shared/hooks/useIncrementor.hook";
import type { AsyncState } from "~/ui/shared/models/async-state.model";
import { onUrlChange } from "~/util/on-url-change";
import { getUiLogger } from "../../shared/util/ui-logger";

declare let window: Window & {
    endpointService: EndpointService;
};

const logger = getUiLogger("PIP ApiHooks");

export function PipApiHooksProvider({ children }: React.PropsWithChildren) {
    return <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>;
}

const apiHooks: ApiContextValue = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSongs,
};

function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    const [revision, increment] = useIncrementor();

    useEffect(() => {
        window.addEventListener(ApiEvents.CurrentPlayingSongChanged, increment);

        return () => window.removeEventListener(ApiEvents.CurrentPlayingSongChanged, increment);
    }, []);

    return useQuery({
        queryKey: ["currentPlayingStreamingServiceSong", revision],
        queryFn: () => window.endpointService.getCurrentPlayingSong(),
    });
}

function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    const [revision, increment] = useIncrementor();

    useEffect(() => {
        const unsubscribe = onUrlChange(increment);

        return () => unsubscribe();
    }, []);

    return useQuery({
        queryKey: ["currentViewStreamingServiceSongs", revision],
        queryFn: async () => (await window.endpointService.getCurrentViewSongs()) ?? [],
    });
}
