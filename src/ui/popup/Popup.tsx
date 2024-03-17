import { StrictMode } from "react";
import { App } from "../app";
import "../app.scss";
import { PopupApiHooksProvider } from "./api-hooks-provider";
import "./popup.scss";

export function Popup() {
    return (
        <StrictMode>
            <PopupApiHooksProvider>
                <App className="max-h-[580px] overflow-y-scroll" />
            </PopupApiHooksProvider>
        </StrictMode>
    );
}
