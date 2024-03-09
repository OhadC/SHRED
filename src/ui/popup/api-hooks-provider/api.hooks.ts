import { Signal, useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { container } from "tsyringe";
import type { StreamingServiceSong } from "~api/api.model";
import type { ApiHooks } from "../../shread/hooks/apiHooks.hook";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "../../shread/hooks/useAsyncSignal.hook";
import { getUiLogger } from "../../shread/util/ui-logger";
import { useCurrentTab } from "./CurrentTab.context";
import { ApiProxy } from "./api-proxy";

const logger = getUiLogger("Popup-Api-hooks");

export const apiHooks: ApiHooks = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): Signal<StreamingServiceSong> {
    const currentTab = useCurrentTab();

    const currentTabId = useComputed<number>(() => currentTab.value?.id);

    const currentPlayingStreamingServiceSong = useSignal<StreamingServiceSong | undefined>(undefined);
    useSignalEffect(() => {
        if (currentTabId.value === undefined) {
            return;
        }

        return container
            .resolve(ApiProxy)
            .subscribeToCurrentPlayingSongFromTab(
                currentTabId.value,
                currentPlayingSong => (currentPlayingStreamingServiceSong.value = currentPlayingSong),
            );
    });

    return currentPlayingStreamingServiceSong;
}

function useCurrentViewStreamingServiceSong(): UseAsyncSignalState<StreamingServiceSong[]> {
    const currentTab = useCurrentTab();

    return useAsyncSignalComputed(async () => {
        if (currentTab.value?.id === undefined) {
            return;
        }

        logger.log("useCurrentViewStreamingServiceSong requsing ApiProxy.getCurrentViewSongsFromTab");

        return container.resolve(ApiProxy).getCurrentViewSongsFromTab(currentTab.value.id);
    });
}
