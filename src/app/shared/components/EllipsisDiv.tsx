export function EllipsisOneLine({ text, className }: { text: string | undefined; className?: string }) {
    return (
        <span title={text} className={`${className ?? ""} standalone-ellipsis-one-line`}>
            {text}
        </span>
    );
}
