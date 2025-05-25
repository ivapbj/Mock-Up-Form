import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Optional if you're not using PropTypes
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["plugin:react/recommended"],
  },
]);
