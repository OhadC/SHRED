import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "~/ui/app";
import "@fontsource-variable/figtree/wght.css";
import "~/ui/app.scss";
import { ActiveTabViewProvider } from "~/ui/state/active-tab-state";
import "./sidepanel.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ActiveTabViewProvider>
            <App className="size-full overflow-y-scroll" />
        </ActiveTabViewProvider>
    </StrictMode>,
);
