import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { container } from "tsyringe";
import type { StreamingServiceSong } from "~/api/api.model";
import { ApiHooksProvider, type ApiContextValue } from "~/ui/shared/contexts/Api.context";
import { useIncrementor } from "~/ui/shared/hooks/useIncrementor.hook";
import type { AsyncState } from "~/ui/shared/models/async-state.model";
import { getUiLogger } from "../../shared/util/ui-logger";
import { CurrentTabContextProvider, useCurrentTab } from "./CurrentTab.context";
import { ApiProxy } from "./api-proxy";

const logger = getUiLogger("Popup-Api-hooks");

export const PopupApiHooksProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <CurrentTabContextProvider>
            <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>
        </CurrentTabContextProvider>
    );
};

const apiHooks: ApiContextValue = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSongs,
};

function useCurrentPlayingStreamingServiceSong(): AsyncState<StreamingServiceSong> {
    const queryClient = useQueryClient();
    const currentTab = useCurrentTab();

    useEffect(() => {
        const currentTabId = currentTab?.id;

        if (currentTabId === undefined) {
            return;
        }

        return container
            .resolve(ApiProxy)
            .subscribeToCurrentPlayingSongFromTab(currentTabId, currentPlayingSong =>
                queryClient.setQueryData(["currentPlayingStreamingServiceSong"], () => currentPlayingSong),
            );
    }, [currentTab]);

    return useQuery({
        queryKey: ["currentPlayingStreamingServiceSong"],
        queryFn: () => null,
    });
}

function useCurrentViewStreamingServiceSongs(): AsyncState<StreamingServiceSong[]> {
    const currentTab = useCurrentTab();
    const [revision, increment] = useIncrementor();

    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        increment();
    }, [currentTab]);

    return useQuery({
        queryKey: ["currentViewStreamingServiceSongs", revision],
        enabled: !!currentTab?.id,
        queryFn: async () => (await container.resolve(ApiProxy).getCurrentViewSongsFromTab(currentTab.id)) ?? [],
    });
}
