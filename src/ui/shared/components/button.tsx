import { type ButtonHTMLAttributes, type ComponentProps, type DetailedHTMLProps } from "react";
import { cn } from "~/util/tailwind/cn";

export function Button({ children, className, ...props }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "flex items-center justify-center rounded-lg bg-foreground/10 p-2 transition-all hover:bg-foreground/20",
                className,
            )}
            type="button"
            {...props}
        >
            {children}
        </button>
    );
}

export function IconButton({ className, ...props }: ComponentProps<typeof Button>) {
    return <Button className={cn("size-8", className)} {...props} />;
}
