import "@abraham/reflection";
import { BrowserBasedApiHooksProvider } from "~/ui/api-hooks-provider/browser-based-api-hooks-provider";
import { App, AppProviders } from "~/ui/app";
import "../ui/app.scss";
import "./sidepanel.scss";

export default function SidePanel() {
    return (
        <AppProviders>
            <BrowserBasedApiHooksProvider>
                <App className="size-full overflow-y-scroll" />
            </BrowserBasedApiHooksProvider>
        </AppProviders>
    );
}
