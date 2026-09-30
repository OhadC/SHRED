import { App } from "~/ui/app";
import { useActiveTabState } from "~/ui/state/active-tab-state";
import "../ui/app.scss";
import "./sidepanel.scss";

export default function SidePanel() {
    const tabView = useActiveTabState();

    return <App className="size-full overflow-y-scroll" tabView={tabView} />;
}
