import appStyles from "data-text:~ui/app.scss";
import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { verifyMatches } from "~/config/supported-hosts";
import type { Unsubscribe } from "~/util/util.model";
import { PictureInPicture } from "./picture-in-picture";
import { PictureInPictureButton } from "./picture-in-picture-button";

declare let window: {
    documentPictureInPicture?: {
        // https://developer.chrome.com/docs/web-platform/document-picture-in-picture
        requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
};

export const config: PlasmoCSConfig = {
    matches: ["*://open.spotify.com/*", "*://listen.tidal.com/*", "*://music.youtube.com/*"],
};
verifyMatches(config.matches);

export const getRootContainer = () => {
    const container = document.createElement("div");
    container.setAttribute("id", "shred-pip-container");
    container.style.position = "fixed";
    container.style.top = "70px";
    container.style.right = "26px";
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

// eslint-disable-next-line no-empty-pattern
const PipTriggerUi = ({}: PlasmoCSUIProps) => {
    const [showButton, setShowButton] = useState<boolean>(!!window?.documentPictureInPicture);

    const openPipContainer = async () => {
        const pipWindow: Window = await window.documentPictureInPicture?.requestWindow({
            width: 360,
            height: 600,
        });

        if (!pipWindow) {
            return;
        }

        const pipDocument: Document = pipWindow.document;

        appendStylesToPip(pipDocument);
        const unobserveExternalStyles = disableExternalStyles(pipDocument);

        const container = pipDocument.createElement("div");
        pipDocument.body.append(container);

        const pipRoot = createRoot(container);
        pipRoot.render(<PictureInPicture />);

        setShowButton(false);
        pipWindow.addEventListener(
            "pagehide",
            () => {
                setShowButton(true);
                unobserveExternalStyles();
            },
            { once: true },
        );
    };

    return <>{showButton && <PictureInPictureButton onClick={openPipContainer} />}</>;
};

export default PipTriggerUi;

function appendStylesToPip(pipDocument: Document) {
    // https://docs.plasmo.com/quickstarts/with-tailwindcss#in-content-scripts-ui
    // https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API/Using#copy_style_sheets_to_the_picture-in-picture_window
    const style = pipDocument.createElement("style");
    style.textContent = appStyles;
    pipDocument.head.appendChild(style);
}

function disableExternalStyles(pipDocument: Document): Unsubscribe {
    const mutationObserver = new MutationObserver(changes => {
        const isDirectChildListMutation = changes.some(change => change.type === "childList");
        if (!isDirectChildListMutation) {
            return;
        }

        for (const styleSheet of pipDocument.styleSheets) {
            const isValid = !styleSheet.href && styleSheet.cssRules.item(0).cssText.startsWith("shred-css-file");
            if (!isValid) {
                styleSheet.disabled = true;
            }
        }

        setTimeout(() => {
            for (const linkElem of pipDocument.querySelectorAll("link[rel=stylesheet]")) {
                linkElem.remove();
            }
        }, 0);
    });

    mutationObserver.observe(pipDocument.body, { childList: true, subtree: false });

    return () => mutationObserver.disconnect();
}
