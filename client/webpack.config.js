const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      cards: "./src/js/cards.js",
    },

    // TODO: Add the correct output
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    // TODO: Add the correct plugins
    plugins: [
      // create html file for the dist
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "TODOs List",
      }),
      // generate service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // create manifest.json
      new WebpackPwaManifest({
        name: "contact",
        description: "contact directory where you can add contacts",
        background_color: "white",
        theme_color: "forestgreen",
        inject: true,
        fingerprints: false,
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
