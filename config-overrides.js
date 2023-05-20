const { override, addWebpackAlias } = require("customize-cra");
const { resolve } = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": resolve(__dirname, "src/components"),
    "@pages": resolve(__dirname, "src/pages"),
    "@assets": resolve(__dirname, "src/assets"),
    "@typings": resolve(__dirname, "src/types"),
    "@hooks": resolve(__dirname, "src/hooks"),
    "@api": resolve(__dirname, "src/api"),
    "@routes": resolve(__dirname, "src/routes"),
    "@contexts": resolve(__dirname, "src/contexts"),
    "@utilities": resolve(__dirname, "src/utils"),
  })
);
