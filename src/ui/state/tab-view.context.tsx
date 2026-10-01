import type { TabState } from "~/api/api.model";
import { createSafeContext } from "../util/create-safe-context";

export type TabView = { status: "connecting" } | { status: "no-content-script" } | { status: "connected"; state: TabState };

const [useTabView, TabViewContextProvider] = createSafeContext<TabView>();

export { TabViewContextProvider, useTabView };
