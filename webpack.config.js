const path = require("path");

module.exports = (_, ctx) => {
  return {
    devtool: ctx.mode === "production" ? false : "inline-source-map",
    entry: "./client/main.jsx",
    output: {
      filename: "main.bundle.js",
      path: path.resolve(__dirname, "public/dist"),
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(?:js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              presets: [["@babel/preset-env"], ["@babel/preset-react"]],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
