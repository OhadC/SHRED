import { createElement, type ButtonHTMLAttributes, type ComponentProps, type DetailedHTMLProps } from "react";
import { cn } from "~/util/tailwind/cn";

export function Button({
    children,
    className,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { href?: string }) {
    const rootElementName = props.href ? "a" : "button";
    const defaultProps = props.href ? { target: "_blank", rel: "noopener noreferrer" } : { type: "button" };

    return createElement(
        rootElementName,
        {
            className: cn(
                "flex items-center justify-center rounded-lg bg-background-800 p-2 transition-all hover:bg-background-700",
                className,
            ),
            ...defaultProps,
            ...props,
        },
        children,
    );
}

export function IconButton({ className, ...props }: ComponentProps<typeof Button>) {
    return <Button className={cn("size-8", className)} {...props} />;
}
