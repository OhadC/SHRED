import { useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { serveTabState } from "~/api/tab-state";
import { SUPPORTED_HOSTS_MATCHES } from "~/config/supported-hosts";
import appStyles from "~/ui/app.scss?inline";
import type { Unsubscribe } from "~/util/util.model";
import { PictureInPicture } from "./picture-in-picture";
import { PictureInPictureButton } from "./picture-in-picture-button";

declare let window: {
    documentPictureInPicture?: {
        // https://developer.chrome.com/docs/web-platform/document-picture-in-picture
        requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
};

export default defineContentScript({
    matches: SUPPORTED_HOSTS_MATCHES,
    async main(ctx) {
        serveTabState();

        const ui = await createShadowRootUi<Root>(ctx, {
            name: "shred-pip",
            position: "inline",
            anchor: "body",
            css: ":host { position: fixed !important; top: 70px !important; right: 26px !important; z-index: 99 !important; }",
            onMount(container) {
                const root = createRoot(container);
                root.render(<PipTriggerUi />);

                return root;
            },
            onRemove: root => root?.unmount(),
        });

        ui.mount();
    },
});

const PipTriggerUi = () => {
    const [showButton, setShowButton] = useState<boolean>(!!window?.documentPictureInPicture);

    const openPipContainer = async () => {
        const pipWindow: Window = await window.documentPictureInPicture?.requestWindow({
            width: 360,
            height: 700,
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
                pipRoot.unmount();
                setShowButton(true);
                unobserveExternalStyles();
            },
            { once: true },
        );
    };

    return <>{showButton && <PictureInPictureButton onClick={openPipContainer} />}</>;
};

function appendStylesToPip(pipDocument: Document) {
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
