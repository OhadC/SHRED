import { Signal, useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { container } from "tsyringe";
import type { ApiHooks } from "~app/shared/hooks/api-hooks";
import { useAsyncSignalComputed, type UseAsyncSignalState } from "~app/shared/hooks/use-async-signal.hook";
import type { StreamingServiceSong } from "~shared/shared-api.model";
import { getPopupLogger } from "../popup-logger";
import { useApiRpcProxy } from "./ApiRpcProxy.context";
import { useCurrentTab } from "./CurrentTab.context";
import { ApiProxy } from "./api-proxy";

const logger = getPopupLogger("ApiHooks");

export const apiHooks: ApiHooks = {
    useCurrentPlayingStreamingServiceSong,
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): Signal<StreamingServiceSong> {
    const currentTab = useCurrentTab();
    const apiRpcProxy = useApiRpcProxy();

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
    const apiRpcProxy = useApiRpcProxy();

    return useAsyncSignalComputed(async () => {
        if (currentTab.value?.id === undefined) {
            return;
        }

        logger.log("useCurrentViewStreamingServiceSong requsing ApiProxy.getCurrentViewSongsFromTab");

        return apiRpcProxy.value.proxy.getCurrentViewSongs();
    });
}
