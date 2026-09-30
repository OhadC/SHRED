import { StrictMode, useMemo, useSyncExternalStore, type PropsWithChildren } from "react";
import { tabState } from "~/api/tab-state";
import { App } from "~/ui/app";
import { TabViewContextProvider } from "~/ui/state/tab-view.context";

const subscribe = (onChange: () => void) => {
    const subscription = tabState.subscribe(onChange);

    return () => subscription.unsubscribe();
};

function TabStateViewProvider({ children }: PropsWithChildren) {
    const state = useSyncExternalStore(subscribe, () => tabState.getValue());
    const view = useMemo(() => ({ status: "connected" as const, state }), [state]);

    return <TabViewContextProvider value={view}>{children}</TabViewContextProvider>;
}

export function PictureInPicture() {
    return (
        <StrictMode>
            <TabStateViewProvider>
                <App className="h-screen w-screen overflow-y-scroll" />
            </TabStateViewProvider>
        </StrictMode>
    );
}
