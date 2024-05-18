import type { PlasmoCSConfig } from "plasmo";
import { getApi } from "~/api";
import type { Api } from "~/api/api";
import type { EndpointService } from "~/api/endpoint-service";

export const config: PlasmoCSConfig = {
    matches: ["*://open.spotify.com/*", "*://listen.tidal.com/*"],
};

declare let window: Window & {
    endpointService: EndpointService;
};

function initialize() {
    const api: Api = getApi();

    window.endpointService = api.endpointService;
}

initialize();
