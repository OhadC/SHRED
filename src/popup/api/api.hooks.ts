import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import type { AsyncState } from "react-use/lib/useAsyncFn";
import { container } from "tsyringe";
import type { StreamingServiceSong } from "~shared/shared-api.model";
import { useCurrentTab } from "./CurrentTab.context";
import { ApiProxy } from "./api-proxy";

export const apiHooks = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): StreamingServiceSong {
    const currentTab = useCurrentTab();

    const [currentPlayingStreamingServiceSong, setCurrentPlayingStreamingServiceSong] = useState<StreamingServiceSong | undefined>();
    useEffect(() => {
        if (currentTab?.id === undefined) {
            return;
        }

        return container.resolve(ApiProxy).subscribeToCurrentPlayingSongFromTab(currentTab.id, setCurrentPlayingStreamingServiceSong);
    }, [currentTab?.id]);

    return currentPlayingStreamingServiceSong;
}

function useCurrentViewStreamingServiceSong(): AsyncState<StreamingServiceSong[]> {
    const currentTab = useCurrentTab();

    return useAsync(async () => {
        if (currentTab?.id === undefined) {
            return [];
        }

        return container.resolve(ApiProxy).getCurrentViewSongsFromTab(currentTab.id);
    }, [currentTab]);
}
