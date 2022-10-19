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
npm publish
```

http://localhost:4873/ を開いて登録されているか確認

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