const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },
  devServer: {
    publicPath: "/dist/", // ビルドしたファイルにアクセスするためのパス
    hot: true, // ホットリロードを有効にする
    open: true, // 起動時にブラウザで開く
  },
};
