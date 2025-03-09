import { cn } from "~/util/tailwind/cn";
import type { PropsWithClassName } from "../models/with-class-name";

export function EllipsisOneLine({ text, className }: PropsWithClassName & { text: string | undefined }) {
    return (
        <span title={text} className={cn("truncate", className)}>
            {text}
        </span>
    );
}
