import { SongsView } from "./SongsView/SongsView";
import "./app.scss";
import { CurrentTabContextProvider } from "./shared/contexts/CurrentTab.context";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";

export const AppComponent: React.FunctionComponent = () => (
    <LocaleContextProvider>
        <CurrentTabContextProvider>
            <SongsView />
        </CurrentTabContextProvider>
    </LocaleContextProvider>
);
