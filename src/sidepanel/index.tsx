import "@abraham/reflection";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import "../ui/app.scss";
import "./sidepanel.scss";
import { BrowserBasedApiHooksProvider } from "~/ui/api-hooks-provider/browser-based-api-hooks-provider";
import { App, queryClient } from "~/ui/app";

export default function SidePanel() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserBasedApiHooksProvider>
                    <App className="size-full overflow-y-scroll" />
                </BrowserBasedApiHooksProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
