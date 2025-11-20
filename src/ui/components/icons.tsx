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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
    );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}

export function FilterListIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
            <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
        </svg>
    );
}
