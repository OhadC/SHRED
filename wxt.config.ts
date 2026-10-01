import { defineConfig } from "wxt";

export default defineConfig({
    srcDir: "src",
    modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
    autoIcons: { sizes: [128, 64, 48, 32, 16] },
    vite: () => ({
        build: { assetsInlineLimit: (file: string) => file.endsWith(".woff2") || undefined },
    }),
    manifest: {
        name: "SHRED",
        host_permissions: ["https://*.songsterr.com/*"],
        permissions: ["declarativeContent"],
    },
});
