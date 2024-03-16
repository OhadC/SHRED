import { cn } from "~util/cn";
import { LocaleContextProvider } from "./shread/contexts/Locale.context";
import { SongsView } from "./songs-view/SongsView";

export type AppProperties = {
    className?: string;
};

export function App({ className }: AppProperties) {
    return (
        <>
            <div className={cn("p-2 pt-4", className)}>
                <LocaleContextProvider>
                    <SongsView />
                </LocaleContextProvider>
            </div>
        </>
    );
}
