# npm-publish-test

npmモジュールをpublishするサンプル

## privateなnpmレジストリのセットアップ

レジストリには[verdaccio](https://github.com/verdaccio/verdaccio)を使用

```
#　verdaccioをglobalにインストール
yarn global add verdaccio@6-next

# 起動
verdaccio
```

http://localhost:4873/ をブラウザで開いて確認

## モジュールのpublish

※yarnだとエラーが起こることがあるのでnpmで行う

package.jsonを編集

```
"name": "@hoge/sample-module",
"publishConfig": {
  "registry": "http://localhost:4873/"
}
```

レジストリにログイン  
→username,password,emailを求められるので入力
```
npm login --registry=http://localhost:4873/
```


モジュールのpublish
```
# 先にビルド
npm run build

# レジストリに登録
npm publish
```

http://localhost:4873/ を開いて登録されているか確認

## モジュールのバンドル

sample-moduleをそのまま配布するとソースコードが見えてしまうので、難読化 & minifyしたファイルのみ登録する。

package.jsonのfilesで登録するファイルを指定出来るので、バンドル後のファイルが配置されるdistを指定。

[rollup](https://rollupjs.org/guide/en/)を使用してモジュールをバンドルする  
参考: https://zenn.dev/yuki0410/articles/74f80c4243919ea2a247-2

- ソースマップは含めない(sourcemap: false)
- terserでコメントを全て削除してcompress: trueで圧縮

## 利用する側の設定

.npmrcを配置し、以下のように設定  
→`@hoge`配下のモジュールはプライベートリポジトリを参照するようになる
```
@hoge:registry=http://localhost:4873/
```

パッケージをインストール
```
yarn add @hoge/sample-module
```

実行
```
node index.js
```
