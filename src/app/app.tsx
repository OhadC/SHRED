import { SongsView } from "./SongsView/SongsView";
import "./app.scss";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";

export function AppComponent() {
    return (
        <LocaleContextProvider>
            <SongsView />
        </LocaleContextProvider>
    );
}
