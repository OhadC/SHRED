import "@abraham/reflection";
import { App } from "~/ui/app";
import "~/ui/app.scss";
import { BrowserBasedApiHooksProvider } from "~/ui/state/api-hooks/providers/browser-based-api-hooks-provider";
import "./popup.scss";

export default function Popup() {
    return <App className="max-h-[580px] overflow-y-scroll" ApiHooksProvider={BrowserBasedApiHooksProvider} />;
}
