const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/js/index.js"],
  output: {
    path: path.join(__dirname, "dist/js"),
  },
  devServer: {
    contentBase: "./dist",
  },
};
