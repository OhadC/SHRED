import { useSyncExternalStore } from "react";
import { tabState } from "~/api/tab-state";
import { App } from "~/ui/app";

const subscribe = (onChange: () => void) => {
    const subscription = tabState.subscribe(onChange);

    return () => subscription.unsubscribe();
};

export function PictureInPicture() {
    const state = useSyncExternalStore(subscribe, () => tabState.getValue());

    return <App className="h-screen w-screen overflow-y-scroll" tabView={{ status: "connected", state }} />;
}
