const path = require("path");

var config = {
  entry: {
    index: [path.resolve(__dirname, "src/index.ts")],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
      },
    ],
  },
  target: "node"
};

module.exports = config;
