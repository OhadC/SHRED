import { BehaviorSubject } from "rxjs";
import { SupportedHost } from "~/config/supported-hosts";
import { PENDING_TAB_STATE, TAB_READY_MESSAGE, TAB_STATE_PORT_NAME, type TabState } from "./api.model";
import { SPOTIFY_CONFIG } from "./music-streaming-api/music-streaming-service-configs/spotify-config";
import { TIDAL_CONFIG } from "./music-streaming-api/music-streaming-service-configs/tidal-config";
import { YOUTUBE_MUSIC_CONFIG } from "./music-streaming-api/music-streaming-service-configs/youtube-music-config";
import { getTabState$ } from "./music-streaming-api/selector-based-music-streaming-api/selector-based-music-streaming-api";

const MUSIC_STREAMING_SERVICE_CONFIGS = {
    [SupportedHost.Spotify]: SPOTIFY_CONFIG,
    [SupportedHost.Tidal]: TIDAL_CONFIG,
    [SupportedHost.YoutubeMusic]: YOUTUBE_MUSIC_CONFIG,
};

export const tabState = new BehaviorSubject<TabState>(PENDING_TAB_STATE);

getTabState$(MUSIC_STREAMING_SERVICE_CONFIGS[location.host as SupportedHost]).subscribe(state => tabState.next(state));

export function serveTabState() {
    chrome.runtime.onConnect.addListener(port => {
        if (port.name !== TAB_STATE_PORT_NAME) {
            return;
        }

        const subscription = tabState.subscribe(state => port.postMessage(state));
        port.onDisconnect.addListener(() => subscription.unsubscribe());
    });

    announceReady();
    window.addEventListener("pageshow", event => event.persisted && announceReady());
}

function announceReady() {
    chrome.runtime.sendMessage({ type: TAB_READY_MESSAGE }).catch(() => undefined);
}
