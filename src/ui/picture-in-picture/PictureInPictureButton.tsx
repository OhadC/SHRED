import icon from "data-base64:@assets/icon.png";
import styled from "styled-components";

export type PictureInPictureButtonProps = {
    onClick: () => void;
};

export function PictureInPictureButton({ onClick }: PictureInPictureButtonProps) {
    return (
        <IconButton onClick={onClick}>
            <IconImg src={icon}></IconImg>
        </IconButton>
    );
}

export const IconButton = styled.button`
    height: 50px;
    width: 50px;
    background: hsl(0, 0%, 9%);
    border-radius: 45px;
    padding: 12px;
    cursor: pointer;
    overflow: hidden;
    border: 0;
`;

export const IconImg = styled.img`
    width: 100%;
`;
