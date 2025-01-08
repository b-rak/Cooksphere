import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginNode from "eslint-plugin-n";

export default [
  // Common configuration for all files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: ["node_modules/**", "server/node_modules/**", "server/node_modules/ipaddr.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // JavaScript recommended rules
  pluginJs.configs.recommended,
  // React-specific rules
  pluginReact.configs.flat.recommended,
  // Node.js-specific rules
  {
    files: ["server/**/*.{js,mjs,cjs}"],
    plugins: { n: pluginNode },
    rules: {
      "n/no-unpublished-require": "off", // Example rule for Node.js
      "n/no-unsupported-features/es-syntax": "off",
    },
  },
  // React-specific overrides
  {
    files: ["client/**/*.{js,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React in scope
      "react/prop-types": "off", // Turn off if not using prop-types
    },
  },
];
