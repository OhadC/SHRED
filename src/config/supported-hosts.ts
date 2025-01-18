import Logger from "js-logger";
import _ from "lodash";

const logger = Logger.get(`SHRED supported-hosts`);

export enum SupportedHost {
    Spotify = "open.spotify.com",
    Tidal = "listen.tidal.com",
    YoutubeMusic = "music.youtube.com",
}
export const SUPPORTED_HOSTS = [SupportedHost.Spotify, SupportedHost.Tidal, SupportedHost.YoutubeMusic];
export const SUPPORTED_HOSTS_MATCHES = SUPPORTED_HOSTS.map(host => `*://${host}/*`);

export function verifyMatches(declaredMatches: string[]) {
    if (!_.isEqual(declaredMatches, SUPPORTED_HOSTS_MATCHES)) {
        logger.error("declaredMatches !== SUPPORTED_HOSTS_MATCHES");
    }
}
