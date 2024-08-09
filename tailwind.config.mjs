import { amber, orange, zinc } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    // darkMode: "class",
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            borderWidth: {
                DEFAULT: "1px",
                1: "1px",
            },
            colors: {
                primary: amber[500],
                accent: orange[600],
                background: zinc,
                foreground: zinc[200],
                "foreground-light": zinc[400],
            },
        },
    },
    plugins: [],
};
