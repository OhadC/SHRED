/**
 * @type {import('prettier').Options}
 */
export default {
    printWidth: 140,
    tabWidth: 4,
    singleQuote: false,
    arrowParens: "avoid",
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
    importOrder: [
        "<BUILTIN_MODULES>", // Node.js built-in modules
        "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
        // "", // Empty line
        "^@plasmo/(.*)$",
        // "",
        "^@plasmohq/(.*)$",
        // "",
        "^~(.*)$",
        // "",
        "^[./]"
    ]
}
