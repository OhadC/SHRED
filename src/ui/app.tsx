import { QueryClient } from "@tanstack/react-query";
import { cn } from "~/util/tailwind/cn";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";
import { SongsView } from "./songs-view/SongsView";

export const queryClient = new QueryClient();

export type AppProperties = {
    className?: string;
};

export function App({ className }: AppProperties) {
    return (
        <div className={cn("p-2 pt-4", className)}>
            <LocaleContextProvider>
                <SongsView />
            </LocaleContextProvider>
        </div>
    );
}
