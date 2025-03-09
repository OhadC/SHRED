import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { App, queryClient } from "../app";
import "../app.scss";
import { PopupApiHooksProvider } from "./api-hooks-provider";
import "./popup.scss";

export function Popup() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <PopupApiHooksProvider>
                    <App className="h-[580px] overflow-y-scroll" />
                </PopupApiHooksProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
