
export enum SupportedHost {
    Spotify = "open.spotify.com",
    Tidal = "listen.tidal.com",
    YoutubeMusic = "music.youtube.com"
}
export const SUPPORTED_HOSTS = [SupportedHost.Spotify, SupportedHost.Tidal, SupportedHost.YoutubeMusic]
export const SUPPORTED_HOSTS_MATCHES = SUPPORTED_HOSTS.map(host => `"*://${host}/*"`)