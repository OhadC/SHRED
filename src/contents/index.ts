import type { PlasmoCSConfig } from "plasmo";
import "~/api";

export const config: PlasmoCSConfig = {
    matches: ["https://*.spotify.com/*", "https://*.tidal.com/*"],
};
