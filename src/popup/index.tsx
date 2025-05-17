import "@abraham/reflection";
import { BrowserBasedApiHooksProvider } from "~/ui/api-hooks-provider/browser-based-api-hooks-provider";
import { App, AppProviders } from "~/ui/app";
import "~/ui/app.scss";
import "./popup.scss";

export default function Popup() {
    return (
        <AppProviders>
            <BrowserBasedApiHooksProvider>
                <App className="max-h-[580px] overflow-y-scroll" />
            </BrowserBasedApiHooksProvider>
        </AppProviders>
    );
}
