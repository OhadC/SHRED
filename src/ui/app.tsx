import { QueryClient } from "@tanstack/react-query";
import { cn } from "~/util/tailwind/cn";
import { LocaleContextProvider } from "./shared/contexts/Locale.context";
import type { PropsWithClassName } from "./shared/models/with-class-name";
import { SongsView } from "./songs-view/SongsView";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: Infinity,
            refetchOnWindowFocus: false,
        },
    },
});

export function App({ className }: PropsWithClassName) {
    return (
        <div className={cn("px-2 pb-2", className)}>
            <LocaleContextProvider>
                <SongsView />
            </LocaleContextProvider>
        </div>
    );
}
