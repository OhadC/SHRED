import { AppComponent } from "../app";
import { PipApiHooksProvider } from "./api-hooks-provider";

export function PictureInPicture() {
    return (
        <PipApiHooksProvider>
            <AppComponent />
        </PipApiHooksProvider>
    );
}
