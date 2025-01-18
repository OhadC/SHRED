import type { PlasmoCSConfig } from "plasmo";
import { getApi } from "~/api";
import type { Api } from "~/api/api";
import type { EndpointService } from "~/api/endpoint-service";
import { SUPPORTED_HOSTS_MATCHES } from "~/config/supported-hosts";

export const config: PlasmoCSConfig = {
    matches: SUPPORTED_HOSTS_MATCHES,
};

declare let window: Window & {
    endpointService: EndpointService;
};

function initialize() {
    const api: Api = getApi();

    window.endpointService = api.endpointService;
}

initialize();
