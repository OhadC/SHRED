import { QueryClientProvider } from "@tanstack/react-query";
import { WindowBasedApiHooksProvider } from "~/ui/api-hooks-provider/window-based-api-hooks-provider";
import { App, queryClient } from "~/ui/app";

export function PictureInPicture() {
    return (
        <QueryClientProvider client={queryClient}>
            <WindowBasedApiHooksProvider>
                <App className="h-screen w-screen overflow-y-scroll" />
            </WindowBasedApiHooksProvider>
        </QueryClientProvider>
    );
}
