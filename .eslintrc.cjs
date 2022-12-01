/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  env: { browser: false },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "ES2019",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "arrow-spacing":["warn"],
    "camelcase":["warn"],
    "consistent-return":["error"],
    "default-case-last":["error"],
    "default-case":["warn"],
    "dot-notation":["error"],
    "eqeqeq":["error"],
    "linebreak-style": ["error","unix"],
    "no-console":["warn"],
    "no-constant-binary-expression":["error"],
    "no-duplicate-imports":["warn",{"includeExports":true}],
    "no-empty-function":["error"],
    "no-eval":["error"],
    "no-floating-decimal":["warn"],
    "no-lone-blocks":["error"],
    "no-lonely-if":["error"],
    "no-mixed-operators":["error"],
    "no-new-wrappers":["error"],
    "no-self-compare":["error"],
    "no-unreachable-loop":["error"],
    indent: ["error",2],
    quotes: ["error","double"],
    semi: ["warn","never"],
  }
}
