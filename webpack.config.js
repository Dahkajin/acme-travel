const path = require("path");
const postcssPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];

module.exports = {
  entry: "./app/assets/scripts/App.js",

  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app/temp/scripts"),
  },

  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false,
    },
    hot: true,
    port: 3000,
  },

  mode: "development",

  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: postcssPlugins } },
          },
        ],
      },
    ],
  },
};
