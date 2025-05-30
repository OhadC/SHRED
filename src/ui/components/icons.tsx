import type { FC, SVGProps } from "react";
import { cn } from "~/util/tailwind/cn";
import type { PropsWithClassName } from "../models/with-class-name";

export function IconsSwitcher({
    First,
    Second,
    isFirst,
    className,
}: PropsWithClassName & {
    First: FC<PropsWithClassName>;
    Second: FC<PropsWithClassName>;
    isFirst: boolean;
}) {
    return (
        <div className={cn("pile", className)}>
            <First className={cn("size-full transition-transform duration-300", !isFirst && "rotate-90 opacity-0")} />
            <Second className={cn("size-full transition-transform duration-300", isFirst && "-rotate-90 opacity-0")} />
        </div>
    );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
