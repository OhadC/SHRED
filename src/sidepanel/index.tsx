import { StrictMode } from "react";
import { App } from "~/ui/app";
import { ActiveTabViewProvider } from "~/ui/state/active-tab-state";
import "../ui/app.scss";
import "./sidepanel.scss";

export default function SidePanel() {
    return (
        <StrictMode>
            <ActiveTabViewProvider>
                <App className="size-full overflow-y-scroll" />
            </ActiveTabViewProvider>
        </StrictMode>
    );
}
