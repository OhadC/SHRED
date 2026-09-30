import { App } from "~/ui/app";
import "~/ui/app.scss";
import { useActiveTabState } from "~/ui/state/active-tab-state";
import "./popup.scss";

export default function Popup() {
    const tabView = useActiveTabState();

    return <App className="max-h-[580px] overflow-y-scroll" tabView={tabView} />;
}
