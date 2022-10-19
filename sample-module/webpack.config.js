const path = require('path');

module.exports = {
  mode: 'development',
  target: ["web", "es5"],
  // エントリーポイント
  entry: `./src/index.js`,
  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "index.js",
    //  出力先のパス
    path: path.join(__dirname, 'dist')
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        // 処理対象ファイル
        test: /\.js$/,
        // 処理対象から外すファイル
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
          }
        ]
      }
    ]
  }
};