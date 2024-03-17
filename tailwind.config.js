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
                primary: "#f59e0b", // amber-500
                accent: "#ea580c", // orange-600
            },
        },
    },
    plugins: [],
};
