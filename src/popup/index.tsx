import { StrictMode } from "react";
import { App } from "~/ui/app";
import "~/ui/app.scss";
import { ActiveTabViewProvider } from "~/ui/state/active-tab-state";
import "./popup.scss";

export default function Popup() {
    return (
        <StrictMode>
            <ActiveTabViewProvider>
                <App className="max-h-[580px] overflow-y-scroll" />
            </ActiveTabViewProvider>
        </StrictMode>
    );
}
