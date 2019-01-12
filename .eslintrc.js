module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["plugin:prettier/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prettier/prettier": "error"
  }
};
