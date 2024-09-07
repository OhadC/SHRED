import "@abraham/reflection";
import { installAutoSignalTracking } from "@preact/signals-react/runtime";
import { Popup } from "~/ui/root-views/popup/Popup";

installAutoSignalTracking();

export default Popup;
