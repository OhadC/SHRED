import { useComputed, useSignalEffect } from "@preact/signals-react";
import { container } from "tsyringe";
import type { StreamingServiceSong } from "~/api/api.model";
import { ApiHooksProvider, type ApiContextValue } from "~/ui/shread/contexts/Api.context";
import { useAsyncSignal, useAsyncSignalComputed } from "../../shread/hooks/useAsyncSignal.hook";
import { type ReadonlyPromiseSignal } from "../../shread/util/promise-signal";
import { getUiLogger } from "../../shread/util/ui-logger";
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
    useCurrentViewStreamingServiceSong,
};

function useCurrentPlayingStreamingServiceSong(): ReadonlyPromiseSignal<StreamingServiceSong> {
    const _promiseSignal = useAsyncSignal<StreamingServiceSong | undefined>(undefined);

    const currentTab = useCurrentTab();

    const currentTabId = useComputed<number>(() => currentTab.value?.id);

    useSignalEffect(() => {
        if (currentTabId.value === undefined) {
            return;
        }

        return container
            .resolve(ApiProxy)
            .subscribeToCurrentPlayingSongFromTab(
                currentTabId.value,
                currentPlayingSong => (_promiseSignal.promise = Promise.resolve(currentPlayingSong)),
            );
    });

    return _promiseSignal;
}

function useCurrentViewStreamingServiceSong(): ReadonlyPromiseSignal<StreamingServiceSong[]> {
    const currentTab = useCurrentTab();

    return useAsyncSignalComputed(async () => {
        if (currentTab.value?.id === undefined) {
            return;
        }

        logger.log("useCurrentViewStreamingServiceSong requsing ApiProxy.getCurrentViewSongsFromTab");

        return container.resolve(ApiProxy).getCurrentViewSongsFromTab(currentTab.value.id);
    });
}
