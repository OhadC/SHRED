export const EllipsisOneLine: React.FunctionComponent<{ text: string | undefined; className?: string }> = ({ text, className }) => (
    <span title={text} className={`${className ?? ""} standalone-ellipsis-one-line`}>
        {text}
    </span>
);
