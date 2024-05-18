const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    // darkMode: "class",
    content: ["./**/*.tsx"],
    theme: {
        extend: {
            borderWidth: {
                DEFAULT: "1px",
                1: "1px",
            },
            colors: {
                primary: colors.amber[500],
                accent: colors.orange[600],
                background: colors.zinc,
                foreground: colors.zinc[200],
                "foreground-light": colors.zinc[400],
            },
        },
    },
    plugins: [],
};
