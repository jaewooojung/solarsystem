const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/script.ts"),
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // ts
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      // CSS
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        exclude: /node_modules/,
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        exclude: /node_modules/,
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },

      // glsl
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        exclude: /node_modules/,
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
};
