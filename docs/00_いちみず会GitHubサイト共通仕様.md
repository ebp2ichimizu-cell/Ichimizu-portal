# 00_いちみず会GitHubサイト共通仕様

基準日：2026-09-24

## 1. 対象サイト

| サイト | 公開URL | GitHubリポジトリ |
|---|---|---|
| いちみずポータル | https://ebp2ichimizu-cell.github.io/Ichimizu-portal/ | `ebp2ichimizu-cell/Ichimizu-portal` |
| いちみず会 研究HUB | https://ebp2ichimizu-cell.github.io/ichimizu-research-hub-github/#/ | `ebp2ichimizu-cell/ichimizu-research-hub-github` |
| 海外EBP・犯罪予防リソース日本語ナビ | https://ebp2ichimizu-cell.github.io/overseas-ebp-jp-nav/#/ | `ebp2ichimizu-cell/overseas-ebp-jp-nav` |

## 2. 共通運用原則

- GitHub Pagesで公開する静的サイトを基本とする。
- UIロジックと掲載データを可能な限り分離する。
- 日常更新は JSON、`data/`、`content/` を中心に行い、基幹HTML・ルーター・共通CSS・データローダーは必要時以外変更しない。
- 外部リンクは必ずクリック／タップ可能なリンクとする。
- スマートフォン表示を必須条件とする。
- JSON更新後は構文エラーがないことを確認する。
- Hash routing を採用するサイトでは `#/` 以下のURLを維持する。
- 画像・ロゴ・QRコード等の資産はファイル名変更時に参照箇所も同時更新する。

## 3. 共通連絡先

トップページ末尾：

> お問い合わせ  
> サイト管理者：いちみず会事務局（元奈良県警察　草尾祐樹）  
> 連絡先：ebp2.ichimizu@gmail.com

```html
<a href="mailto:ebp2.ichimizu@gmail.com">ebp2.ichimizu@gmail.com</a>
```

## 4. バックアップ方針

大きな仕様変更前は各リポジトリ全体をZIPまたはcloneで保存する。

推奨保存単位：
1. リポジトリ全体
2. `index.html`
3. `css/`
4. `js/`
5. `data/`
6. `content/`
7. `assets/`
8. `.nojekyll`、`robots.txt`、`manifest.json`、`service-worker.js` 等

## 5. 再構築時の基本手順

1. 新しいGitHubリポジトリを作成。
2. 元リポジトリのディレクトリ構造を再現。
3. `index.html` と基幹CSS／JSを配置。
4. データファイルを配置。
5. Markdown等の長文コンテンツを配置。
6. 画像・ロゴ等を配置。
7. 設定ファイルを配置。
8. GitHub Pagesを有効化。
9. トップ、一覧、詳細、検索、外部リンク、スマホ表示を確認。
10. 必要に応じ旧URLからのリンクを修正。

## 6. 仕様変更とデータ追加の区別

### 仕様変更
レイアウト、ルーティング、検索ロジック、データスキーマ、CSS構成、表示コンポーネントの変更。仕様書も更新する。

### データ追加
研究追加、海外リソース追加、会合日程更新、おすすめ追加、解説Markdown追加。通常は仕様書更新不要。

## 7. 最低限の動作確認

- トップページが表示される
- 主要リンクが開く
- メールリンクが開く
- スマホ幅で崩れない
- JSON読込エラーがない
- 詳細ページが開く
- Hash URLを再読込しても表示できる
- 外部リンクがクリックできる
- ロゴ・画像が欠落していない
