module.exports = {
  extends: ["prettier", "prettier/react"],
  plugins: ["react", "prettier"],

  parser: "babel-eslint",
  rules: {
    strict: 0
  },
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error"
  }
};
