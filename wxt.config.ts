import { defineConfig } from "wxt";

export default defineConfig({
    srcDir: "src",
    modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
    autoIcons: { sizes: [128, 64, 48, 32, 16] },
    manifest: {
        name: "SHRED",
        host_permissions: ["https://*.songsterr.com/*"],
        permissions: ["tabs", "declarativeContent"],
    },
});
