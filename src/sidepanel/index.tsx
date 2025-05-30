import "@abraham/reflection";
import { App } from "~/ui/app";
import { BrowserBasedApiHooksProvider } from "~/ui/state/api-hooks/providers/browser-based-api-hooks-provider";
import "../ui/app.scss";
import "./sidepanel.scss";

export default function SidePanel() {
    return <App className="size-full overflow-y-scroll" ApiHooksProvider={BrowserBasedApiHooksProvider} />;
}
