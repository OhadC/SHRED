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

                <Footer />
            </LocaleContextProvider>
        </div>
    );
}

function Footer() {
    return (
        <div className="mb-1 mt-6 text-center text-xs text-foreground-light">
            Enjoying SHRED? Rate us on the{" "}
            <Link href="https://chromewebstore.google.com/detail/lkdhepgfcenmcehhjiongbcokflijana?utm_source=item-share-cb">
                Chrome Web Store
            </Link>
            .
            <br />
            Check out the source code on <Link href="https://github.com/OhadC/SHRED">GitHub</Link>.
        </div>
    );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground">
            {children}
        </a>
    );
}
