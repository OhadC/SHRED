import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchByBackground } from "~/ui/util/fetch-by-background";
import { serveFetch } from "./fetch";

type MessageListener = (message: unknown, sender: unknown, sendResponse: (response: unknown) => void) => boolean | void;

function installFakeRuntime() {
    const listeners: MessageListener[] = [];
    const serialize = (value: unknown) => JSON.parse(JSON.stringify(value ?? null));

    vi.stubGlobal("chrome", {
        runtime: {
            onMessage: { addListener: (listener: MessageListener) => listeners.push(listener) },
            sendMessage: (message: unknown) =>
                new Promise(resolve => {
                    for (const listener of listeners) {
                        listener(serialize(message), {}, response => resolve(serialize(response)));
                    }
                }),
        },
    });
}

describe("fetchByBackground", () => {
    beforeEach(() => {
        installFakeRuntime();
        serveFetch();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("returns the parsed JSON body", async () => {
        vi.stubGlobal("fetch", async () => new Response(JSON.stringify([{ songId: 1 }])));

        await expect(fetchByBackground("https://www.songsterr.com/api/songs")).resolves.toEqual([{ songId: 1 }]);
    });

    it("rejects with the HTTP status when the response is not ok", async () => {
        vi.stubGlobal("fetch", async () => new Response("rate limited", { status: 429, statusText: "Too Many Requests" }));

        await expect(fetchByBackground("https://www.songsterr.com/api/songs")).rejects.toMatchObject({
            message: expect.stringContaining("429"),
            status: 429,
        });
    });

    it("rejects with the network error message", async () => {
        vi.stubGlobal("fetch", async () => {
            throw new TypeError("Failed to fetch");
        });

        await expect(fetchByBackground("https://www.songsterr.com/api/songs")).rejects.toThrow("Failed to fetch");
    });
});
