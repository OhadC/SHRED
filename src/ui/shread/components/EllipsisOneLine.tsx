import { cn } from "~util/cn";

export function EllipsisOneLine({ text, className }: { text: string | undefined; className?: string }) {
    return (
        <span title={text} className={cn("truncate", className)}>
            {text}
        </span>
    );
}
