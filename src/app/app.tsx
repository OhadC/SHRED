import { SongsView } from "./SongsView/SongsView";
import "./app.scss";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";

export const AppComponent: React.FunctionComponent = () => (
    <LocaleContextProvider>
        <SongsView />
    </LocaleContextProvider>
);
