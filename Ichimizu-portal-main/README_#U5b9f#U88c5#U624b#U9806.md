# いちみずポータル 主要サイトカード配色・ロゴ追加

作成日：2026-09-26

## 変更範囲

ポータルの既存レイアウト、カード形状、表示順、会合、おすすめ、QR、フッター等は変更しません。

変更するのは「主要サイト」の5カード内部だけです。

- いちみず会HP：オリーブ系
- 研究HUB：ティール系
- 海外EBPナビ：ネイビー＋えんじ
- EBP Daily Brief：ネイビー＋テラコッタ
- 統計演習：ネイビー＋えんじ

各カードにサイトロゴを追加し、背景は各テーマカラーのごく薄い色にしています。

## 背景色

ポータル全体の背景色 `#f7f7f3` は変更していません。

5サイトの異なるテーマカラーを受け止める中立的な暖色系オフホワイトなので、
現状ではこのまま使うのが最も安定します。

## GitHubでの作業

1. `index.html` をこのZIPの `index.html` で全文置換
2. `sites.json` をこのZIPの `sites.json` で全文置換
3. リポジトリ直下に `site-logos` フォルダを作成
4. `site-logos` 内の5つのPNGをそのままアップロード

追加ファイル：

- site-logos/logo-ichimizu.png
- site-logos/logo-research-hub.png
- site-logos/logo-overseas-ebp.png
- site-logos/logo-daily-brief.png
- site-logos/logo-stat-training.png

## 補足

海外EBPナビのURL `./beta-overseas-ebp.html` は相対URLです。
今回の index.html では、この既存β導線もクリックできるよう `safeUrl()` を相対URL対応にしています。

`about.html` と `about-sites.json` は今回は変更していません。
