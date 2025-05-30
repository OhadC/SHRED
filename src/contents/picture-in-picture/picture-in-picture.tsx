import { App } from "~/ui/app";
import { WindowBasedApiHooksProvider } from "~/ui/state/api-hooks/providers/window-based-api-hooks-provider";

export function PictureInPicture() {
    return <App className="h-screen w-screen overflow-y-scroll" ApiHooksProvider={WindowBasedApiHooksProvider} />;
}
