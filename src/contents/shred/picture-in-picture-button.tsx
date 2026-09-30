import icon from "data-base64:@assets/icon.png";

export type PictureInPictureButtonProps = {
    onClick: () => void;
};

export function PictureInPictureButton({ onClick }: PictureInPictureButtonProps) {
    return (
        <button onClick={onClick} style={IconButtonStyles}>
            <img src={icon} style={{ width: "100%" }}></img>
        </button>
    );
}

export const IconButtonStyles: React.CSSProperties = {
    height: "50px",
    width: "50px",
    background: "hsl(0, 0%, 9%)",
    borderRadius: "45px",
    padding: "12px",
    cursor: "pointer",
    overflow: "hidden",
    border: "0",
};
