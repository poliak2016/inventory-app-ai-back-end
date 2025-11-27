import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import n from "eslint-plugin-n";

const commonGlobals = {
  process: "readonly",
  __dirname: "readonly",
  require: "readonly",
};

export default [
  {
    ignores: ["node_modules/", "dist/"],
  },

  js.configs.recommended,
  n.configs["flat/recommended"],
  prettier,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: commonGlobals,
    },
    rules: {
      "n/no-unpublished-import": "off",
      "n/no-missing-import": "off",
    },
  },

  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...commonGlobals,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
];
