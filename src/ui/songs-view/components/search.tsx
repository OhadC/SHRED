import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { IconButton } from "~/ui/shared/components/button";
import { CloseIcon, IconsSwitcher, SearchIcon } from "~/ui/shared/components/icons";
import { useMergeRefs } from "~/ui/shared/hooks/use-merge-refs";
import { useOutsideClick } from "~/ui/shared/hooks/use-outside-click";
import type { PropsWithClassName } from "~/ui/shared/models/with-class-name";
import { cn } from "~/util/tailwind/cn";
import { useSongsViewTranslations } from "../SongsView.translations";

export function Search({
    searchText,
    setSearchText,
    className,
}: PropsWithClassName & {
    searchText: string;
    setSearchText: (text: string) => void;
}) {
    const translations = useSongsViewTranslations();
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const openSearch = () => {
        setOpen(true);
        inputRef.current?.focus();
    };

    const closeSearch = () => {
        setOpen(false);
        setSearchText("");
        inputRef.current?.blur();
    };

    useHotkeys("ctrl+f", openSearch, { preventDefault: true, document: inputRef.current?.ownerDocument });
    const escRef = useHotkeys("esc", closeSearch, { preventDefault: true, enableOnFormTags: true });
    const clickOutsideRef = useOutsideClick(closeSearch, open && !searchText);

    const listenersRef = useMergeRefs<HTMLDivElement>(escRef, clickOutsideRef);

    return (
        <div className={cn("flex justify-end", className)} ref={listenersRef}>
            <input
                ref={inputRef}
                type="text"
                placeholder={translations.songList.searchPlaceholder}
                className={cn("size-8 rounded-lg bg-background p-2 outline-none transition-all", open && "w-full", !open && "opacity-0")}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                tabIndex={open ? 0 : -1}
            />

            <IconButton
                className={cn("absolute end-0 flex", open && "bg-foreground/0")}
                onClick={open ? closeSearch : openSearch}
                title={open ? translations.songList.close : translations.songList.search}
            >
                <IconsSwitcher First={SearchIcon} Second={CloseIcon} isFirst={!open} className="size-5" />
            </IconButton>
        </div>
    );
}
