import vue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { vue },
    rules: {
      ...vue.configs["flat/recommended"].rules,
    },
  },
];
