import React, { useMemo } from "react";

export const EllipsisOneLine: React.FunctionComponent<{ text: string | undefined; className?: string }> = ({ text, className }) => (
    <span title={text} className={useMemo(() => `${className ?? ""} standalone-ellipsis-one-line`, [className])}>
        {text}
    </span>
);
