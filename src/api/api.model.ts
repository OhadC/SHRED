import type { AsyncState } from "~/ui/models/async-state.model";

export type StreamingServiceSong = {
    artist?: string;
    title: string;
};

export type TabState = {
    currentPlayingSong: AsyncState<StreamingServiceSong>;
    currentViewSongs: AsyncState<StreamingServiceSong[]>;
};

export const PENDING_TAB_STATE: TabState = {
    currentPlayingSong: { isPending: true },
    currentViewSongs: { isPending: true },
};

export const TAB_STATE_PORT_NAME = "SHRED_TAB_STATE";

export const TAB_READY_MESSAGE = "SHRED_TAB_READY";
