import { useSignal } from "@preact/signals-react";
import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import { PictureInPicture } from "~ui/picture-in-picture/PictureInPicture";

declare let window: {
    documentPictureInPicture?: {
        // https://developer.chrome.com/docs/web-platform/document-picture-in-picture
        requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
};

export const config: PlasmoCSConfig = {
    matches: ["*://open.spotify.com/*", "*://listen.tidal.com/*"],
    all_frames: true,
};

export const getRootContainer = () => {
    const container = document.createElement("div");
    container.setAttribute("id", "shred-pip-container");
    container.style.position = "fixed";
    container.style.top = "240px";
    container.style.right = "0";
    container.style.zIndex = "99";

    document.body.append(container);

    const style = document.createElement("style");
    style.innerHTML = `
  #shred-pip-container > .plasmo-csui-container {
    position: unset !important;
  }
  `;

    document.head.append(style);

    return container;
};

const PipTriggerUi = ({ anchor }: PlasmoCSUIProps) => {
    const showButton = useSignal<boolean>(!!window?.documentPictureInPicture);

    const openPipContainer = async () => {
        const pipWindow = await window.documentPictureInPicture?.requestWindow({
            width: 360,
            height: 600,
        });

        if (!pipWindow) return;

        const container = pipWindow.document.createElement("div");
        pipWindow.document.body.append(container);

        const pipRoot = createRoot(container);
        pipRoot.render(
            <StrictMode>
                <StyleSheetManager target={pipWindow.document.head}>
                    <PictureInPicture />
                </StyleSheetManager>
            </StrictMode>,
        );

        showButton.value = false;
        pipWindow.addEventListener("pagehide", () => (showButton.value = true), { once: true });
    };

    return <>{showButton.value && <div onClick={openPipContainer}>asdasdasdas</div>}</>;
};

export default PipTriggerUi;
