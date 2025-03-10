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
        <div className={cn("flex flex-col justify-between px-2 pb-2", className)}>
            <LocaleContextProvider>
                <SongsView />

                <Footer className="mb-1 mt-5" />
            </LocaleContextProvider>
        </div>
    );
}

function Footer({ className }: PropsWithClassName) {
    return (
        <div className={cn("text-center text-xs text-foreground-light", className)}>
            <div className="text-center">
                Enjoying SHRED? Rate us on{" "}
                <Link href="https://chromewebstore.google.com/detail/lkdhepgfcenmcehhjiongbcokflijana?utm_source=item-share-cb">
                    Chrome Web Store
                </Link>
            </div>
            <div className="flex justify-center gap-3">
                <Link href="mailto:ohadc.me@gmail.com">Get in touch</Link>
                <Link href="https://github.com/OhadC/SHRED">Source code</Link>
            </div>
        </div>
    );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground">
            {children}
        </a>
    );
}
