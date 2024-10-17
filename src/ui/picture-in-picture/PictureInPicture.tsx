import { QueryClientProvider } from "@tanstack/react-query";
import { App, queryClient } from "../app";
import { PipApiHooksProvider } from "./api-hooks-provider";

export function PictureInPicture() {
    return (
        <QueryClientProvider client={queryClient}>
            <PipApiHooksProvider>
                <App className="size-full overflow-y-scroll" />
            </PipApiHooksProvider>
        </QueryClientProvider>
    );
}
