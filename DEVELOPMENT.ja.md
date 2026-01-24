# 開発ガイド

このドキュメントでは、このリポジトリでエージェントスキルを開発、テスト、および維持する方法について説明します。

## リポジトリの構造

```
agent-skills/
├── README.md              # メインドキュメント
├── CONTRIBUTING.md        # 貢献ガイドライン
├── LICENSE               # MIT ライセンス
├── package.json          # Node.js 設定
├── .gitignore           # Git 無視ルール
│
├── scripts/             # 開発ツール
│   ├── validate-skills.js    # SKILL.md 形式の検証
│   ├── test-skill.js         # 個別のスキルのテスト
│   └── create-skill.js       # 新しいスキルの雛形作成
│
└── skills/              # エージェントスキル
    └── [skill-name]/    # 個別のスキル
        ├── SKILL.md         # 必須: エージェントへの指示
        ├── README.md        # 人間向けのドキュメント
        ├── scripts/         # 任意: ヘルパースクリプト
        ├── references/      # 任意: 詳細なドキュメント
        └── assets/         # 任意: テンプレート、リソース
```

## 開発環境のセットアップ

### 前提条件

- Node.js 18 以上
- npm または pnpm
- Git

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/Keiji-Miyake/agent-skills.git
cd agent-skills

# 依存関係をインストール
npm install

# セットアップの確認
npm run validate
```

## 開発ワークフロー

### 新しいスキルの作成

```bash
# CLI ツールを使用 (推奨)
npm run create-skill my-new-skill

# または手動で作成
mkdir -p skills/my-new-skill
touch skills/my-new-skill/SKILL.md
```

### SKILL.md の編集

Agent Skills 仕様に従ってください：

```markdown
---
name: my-skill-name
description: 簡潔な説明 (1-1024 文字)
license: MIT
metadata:
  author: Keiji Miyake
  version: "1.0"
---

# My Skill Name

AI エージェントへの指示...
```

**主要な原則:**
- 人間ではなく、AI エージェントに向けて書く
- 5000 トークン (~20,000 文字) 未満に保つ
- 段階的開示を使用する (`references/` へのリンク)
- 明確な「いつ使用するか」のトリガーを含める

### テスト

```bash
# 全てのスキルを検証
npm run validate

# 特定のスキルをテスト
npm run test dev-support

# AI エージェントでの手動テスト
npx skills add . --skill dev-support -a github-copilot
```

### 検証ルール

検証スクリプトは以下をチェックします：

- ✅ 必須フィールド: `name`, `description`
- ✅ 名前形式: 小文字、ハイフンのみ、1-64 文字
- ✅ 説明の長さ: 1-1024 文字
- ✅ 予約語なし: `anthropic`, `claude`
- ✅ 連続したハイフンなし
- ✅ ディレクトリ名がスキル名と一致していること
- ⚠️ 本文の長さ: 5万文字を超えると警告

## 段階的開示パターン (Progressive Disclosure Pattern)

大きなスキルの場合は、このパターンを使用してください：

```markdown
---
name: my-large-skill
description: ...
---

# My Large Skill

## クイックスタート

[簡潔な指示]

## アドバンス機能

詳細については、以下を参照してください：
- [API リファレンス](references/api.md)
- [例](references/examples.md)
- [トラブルシューティング](references/troubleshooting.md)
```

AI エージェントは、必要なときだけリファレンスを読み込みます。

## 実際の AI エージェントでのテスト

### GitHub Copilot CLI

```bash
cd /tmp/test-project
npx skills add /path/to/agent-skills --skill dev-support
gh copilot
```

### Claude Code

```bash
cd /tmp/test-project
npx skills add /path/to/agent-skills --skill dev-support -a claude-code
claude-code
```

### ローカルテスト (シンボリックリンク)

```bash
# テスト用のシンボリックリンクを作成
ln -s $(pwd)/skills/dev-support ~/.copilot/skills/dev-support

# AI エージェントでテスト
gh copilot
```

## スキルの維持

### バージョン更新

SKILL.md の `metadata.version` を更新します：

```yaml
metadata:
  author: Keiji Miyake
  version: "1.1"  # バージョンを上げる
```

### 変更履歴 (Changelog)

スキルの `CHANGELOG.md` に変更を記録します：

```markdown
## [1.1.0] - 2026-01-19

### 追加
- 新機能 X

### 変更
- Y の改善

### 修正
- バグ Z
```

## トークン効率

### トークン数の見積もり

経験則: **1 トークン ≈ 4 文字**

```bash
# トークン見積もりの確認
npm run test my-skill
```

### 最適化戦略

1. **SKILL.md を簡潔に保つ** (5000 トークン未満)
2. **詳細なドキュメントには `references/` を使用する**
3. **適切な場合は外部ドキュメントへリンクする**
4. **コードを埋め込む代わりに `scripts/` を使用する**

## 一般的なパターン

### パターン 1: シンプルなスキル

```
skill-name/
└── SKILL.md
```

最適: 単純で集中したタスク

### パターン 2: ドキュメント化されたスキル

```
skill-name/
├── SKILL.md
└── README.md
```

最適: 人間向けのドキュメントが必要なスキル

### パターン 3: 複雑なスキル

```
skill-name/
├── SKILL.md
├── README.md
├── references/
│   ├── guide.md
│   └── api.md
└── scripts/
    └── helper.sh
```

最適: ヘルパーツールを備えたマルチ機能スキル

## トラブルシューティング

### 検証に失敗する

```bash
# 詳細なエラーを表示
npm run validate

# よくある問題:
# - name/description が欠落している
# - 名前の形式が無効 (lowercase-with-hyphens を使用)
# - 説明が長すぎる (1024 文字超)
```

### スキルが読み込まれない

1. ディレクトリ構造を確認する
2. SKILL.md に有効なフロントマターがあるか確認する
3. `skills add` を直接使用してテストする
4. AI エージェントのログを確認する

### トークン制限を超えた

1. コンテンツを `references/` に移動する
2. 外部ドキュメントにリンクする
3. 複数のスキルに分割する

## ベストプラクティス

### すること ✅

- 明確で簡潔な指示を書く
- 実践的な例を含める
- 段階的開示を使用する
- 複数の AI エージェントでテストする
- スキルをいつ使用するかを文書化する
- スキルを1つのタスクに集中させる

### しないこと ❌

- 大きなコードブロックを埋め込む
- 人間向けに書く (README.md を使用してください)
- 時間に敏感な情報を含める
- 不一致な用語を使用する
- 過度に汎用的なスキルを作成する

## リリースプロセス

1. `metadata.version` のスキルバージョンを更新する
2. CHANGELOG.md を更新する
3. `npm run validate` を実行する
4. 少なくとも1つの AI エージェントでテストする
5. コミット: `git commit -m "feat(skill-name): description"`
6. タグ付け: `git tag v1.1.0`
7. プッシュ: `git push && git push --tags`

## 公開

### GitHub へ

```bash
# GitHub でリポジトリを作成
gh repo create Keiji-Miyake/agent-skills --public

# プッシュ
git remote add origin https://github.com/Keiji-Miyake/agent-skills.git
git push -u origin main
git push --tags
```

### SkillsMP へ

1. [skillsmp.com](https://skillsmp.com) にアクセス
2. リポジトリの URL を送信
3. タグと説明を追加

## ヘルプを得る

- GitHub で Issue を作成する
- [Agent Skills Specification](https://agentskills.io) を確認する
- `skills/` 内のサンプルスキルを確認する

## リソース

- [Agent Skills Specification](https://agentskills.io)
- [skills Documentation](https://github.com/vercel-labs/skills)
- [GitHub Copilot Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
