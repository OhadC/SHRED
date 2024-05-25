import "@abraham/reflection";
import { installAutoSignalTracking } from "@preact/signals-react/runtime";
import { Popup } from "~/ui/popup/Popup";

installAutoSignalTracking();

export default Popup;
