import { useComputed, useSignalEffect } from "@preact/signals-react";
import type { PropsWithChildren, ReactNode } from "react";
import { container } from "tsyringe";
import type { StreamingServiceSong } from "~/api/api.model";
import { ApiHooksProvider, type ApiContextValue } from "~/ui/state/Api.context";
import { useAsyncSignal, useAsyncSignalComputed } from "../../../util/hooks/useAsyncSignal.hook";
import { type ReadonlyPromiseSignal } from "../../../util/promise-signal";
import { getUiLogger } from "../../../util/ui-logger";
import { CurrentTabContextProvider, useCurrentTab } from "./CurrentTab.context";
import { ApiProxy } from "./api-proxy";

const logger = getUiLogger("Popup-Api-hooks");

export function PopupApiHooksProvider({ children }: PropsWithChildren): ReactNode {
    return (
        <CurrentTabContextProvider>
            <ApiHooksProvider value={apiHooks}>{children}</ApiHooksProvider>
        </CurrentTabContextProvider>
    );
}

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

        logger.log("useCurrentViewStreamingServiceSong requesting ApiProxy.getCurrentViewSongsFromTab");

        return container.resolve(ApiProxy).getCurrentViewSongsFromTab(currentTab.value.id);
    });
}
