import { WindowBasedApiHooksProvider } from "~/ui/api-hooks-provider/window-based-api-hooks-provider";
import { App, AppProviders } from "~/ui/app";

export function PictureInPicture() {
    return (
        <AppProviders>
            <WindowBasedApiHooksProvider>
                <App className="h-screen w-screen overflow-y-scroll" />
            </WindowBasedApiHooksProvider>
        </AppProviders>
    );
}
