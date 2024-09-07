import { useState } from "react";
import { cn } from "~/ui/util/tailwind/cn";
import { useAppTranslations } from "./App.translations";
import { FavoritesView } from "./favorites-view/FavoritesView";
import { SongsView } from "./songs-view/SongsView";
import { FavoriteSongsContextProvider } from "./state/favorite-songs.context";
import { LocaleContextProvider } from "./state/Locale.context";
import type { PropsWithClassName } from "./util/models/props-with-class-name.model";

enum ETabs {
    SongsView = "SongsView",
    Favorites = "Favorites",
}
const DEFAULT_TAB = ETabs.SongsView;

export function App({ className }: PropsWithClassName) {
    return (
        <LocaleContextProvider>
            <FavoriteSongsContextProvider>
                <AppWithProviders className={className} />
            </FavoriteSongsContextProvider>
        </LocaleContextProvider>
    );
}

function AppWithProviders({ className }: PropsWithClassName) {
    const appTranslations = useAppTranslations();

    const [selectedTab, setSelectedTab] = useState<ETabs>(DEFAULT_TAB);

    return (
        <div className={cn("flex flex-col gap-2 p-2 pt-4", className)}>
            {/* <AnimatedTabs<ETabs>
                value={selectedTab}
                onChange={({ value }) => setSelectedTab(value)}
                className="flex flex-row gap-1"
                indicatorProps={{ className: "top-0 h-8 rounded bg-zinc-700" }}
            >
                <AnimatedTabs.Tab value={ETabs.SongsView} className="flex h-8 items-center p-2 font-bold">
                    {appTranslations.tabs.currentView}
                </AnimatedTabs.Tab>
                <AnimatedTabs.Tab value={ETabs.Favorites} className="flex h-8 items-center p-2 font-bold">
                    {appTranslations.tabs.favorites}
                </AnimatedTabs.Tab>
            </AnimatedTabs> */}

            {selectedTab === ETabs.SongsView && <SongsView />}
            {selectedTab === ETabs.Favorites && <FavoritesView />}
        </div>
    );
}
