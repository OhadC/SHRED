import { App } from "../app";
import { PipApiHooksProvider } from "./api-hooks-provider";

export function PictureInPicture() {
    return (
        <PipApiHooksProvider>
            <App className="size-full overflow-y-scroll" />
        </PipApiHooksProvider>
    );
}
