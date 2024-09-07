import { cn } from "~/ui/util/tailwind/cn";
import type { PropsWithClassName } from "../models/props-with-class-name.model";

export function EllipsisOneLine({ text, className }: PropsWithClassName & { text: string | undefined }) {
    return (
        <span title={text} className={cn("truncate", className)}>
            {text}
        </span>
    );
}
