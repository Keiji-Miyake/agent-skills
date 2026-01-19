# Agent Skills Collection への貢献

貢献に興味を持っていただきありがとうございます！このドキュメントでは、新しいスキルの追加や既存のスキルの改善に関するガイドラインを提供します。

## はじめに

1. このリポジトリをフォークします
2. フォークしたリポジトリをクローンします: `git clone https://github.com/Keiji-Miyake/agent-skills.git`
3. ブランチを作成します: `git checkout -b feature/my-new-skill`
4. 依存関係をインストールします: `npm install`

## 新しいスキルの追加

### 方法 1: CLI ツールを使用する

```bash
npm run create-skill my-awesome-skill
```

これにより、以下のファイルを含む完全なスキルテンプレートが作成されます：
- `SKILL.md` (必須)
- `README.md` (ドキュメント)
- `scripts/` ディレクトリ
- `references/` ディレクトリ

### 方法 2: 手動で作成する

1. ディレクトリを作成します: `mkdir -p skills/my-awesome-skill`
2. 必要なフロントマターを含む `SKILL.md` を作成します：

```markdown
---
name: my-awesome-skill
description: このスキルが何をするのか、いつ使うのかの簡潔な説明
license: MIT
metadata:
  author: Keiji Miyake
  version: "1.0"
---

# My Awesome Skill

[スキルの指示...]
```

## SKILL.md の要件

### 必須フィールド (YAML フロントマター)

- `name`: 小文字、ハイフンのみ、1-64 文字
- `description`: 1-1024 文字、内容と使用場面を記述

### 任意フィールド

- `license`: ライセンスの種類 (例: MIT, Apache-2.0)
- `metadata`: 著者、バージョン、タグ
- `compatibility`: 特別な要件
- `allowed-tools`: このスキルが使用できる特定のツール

### ベストプラクティス

1. **簡潔に保つ**: 5000 トークン (~20,000 文字) 未満を目指す
2. **段階的開示**: 詳細なドキュメントには `references/` を使用する
3. **明確な指示**: 人間ではなく、AI エージェントに向けて書く
4. **例**: 実践的な例を含める
5. **いつ使用するか**: トリガーとなるシナリオを明確に述べる

## スキルの命名規則

✅ **良い例:**
- `git-commit-helper`
- `analyzing-spreadsheets`
- `managing-databases`

❌ **悪い例:**
- `helper` (曖昧すぎる)
- `utils` (一般的すぎる)
- `MySkill` (小文字である必要がある)
- `my--skill` (連続したハイフンは不可)

## スキルのテスト

```bash
# 全てのスキルを検証
npm run validate

# 特定のスキルをテスト
npm run test my-awesome-skill
```

## ドキュメント

各スキルには以下を含める必要があります：

1. **SKILL.md**: AI エージェント向けの指示 (必須)
2. **README.md**: 人間向けのドキュメント (推奨)
3. **references/**: 追加の詳細ドキュメント (任意)
4. **scripts/**: ヘルパースクリプト (任意)

## プルリクエストのプロセス

1. スキルが検証に合格することを確認します: `npm run validate`
2. 少なくとも1つの AI エージェント (Copilot, Claude など) でテストします
3. メインの `README.md` を更新してスキルをリストに追加します
4. 以下を説明する明確な PR の説明文を記述します：
   - スキルが何をするか
   - いつ使用するか
   - テストに使用したエージェント
   - 特別な要件

## 行動規範

- 敬意を払い、包括的であること
- 建設的なフィードバックを提供すること
- スキルの品質と有用性に焦点を当てること
- 他の人が学び、改善するのを助けること

## 質問がある場合

質問がある場合や助けが必要な場合は、Issue を作成してください！

## ライセンス

貢献することにより、あなたの貢献が MIT ライセンスの下でライセンスされることに同意したことになります。
