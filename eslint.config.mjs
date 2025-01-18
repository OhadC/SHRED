import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import prettierConfig from "eslint-config-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

// const customHooksWithDeps = [];

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    eslintPluginReact.configs.flat.recommended,
    ...pluginQuery.configs["flat/recommended"],
    {
        settings: {
            react: {
                // see https://github.com/jsx-eslint/eslint-plugin-react#configuration
                version: "detect",
            },
        },
        plugins: {
            "react-hooks": fixupPluginRules(eslintPluginReactHooks),
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules,

            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-unused-expressions": [
                "warn",
                { allowTernary: true, allowShortCircuit: true, allowTaggedTemplates: true, enforceForJSX: true },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "(^_)|(logger)", caughtErrorsIgnorePattern: "^_", ignoreRestSiblings: true },
            ],

            "@tanstack/query/exhaustive-deps": "off",

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            // "react-hooks/exhaustive-deps": ["warn", { additionalHooks: `(${customHooksWithDeps.join("|")})` }],

            "no-extra-boolean-cast": "off",
            "prefer-const": "warn",
            "no-console": ["warn", { allow: ["groupCollapsed", "groupEnd"] }],

            "no-var": "error",
            "no-global-assign": "error",
            "no-duplicate-imports": "error",
            curly: "error", // Enforce consistent brace style for all control statements
        },
    },
    {
        ignores: ["dist/", "node_modules/", "auto-generated/"],
    },
    prettierConfig, // Turns off all rules that are unnecessary or might conflict with Prettier.
);
