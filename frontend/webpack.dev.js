const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

require("dotenv").config({
  path: path.join(__dirname, "./.env.development"),
});

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ["babel-loader", "ts-loader"] }],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
});
