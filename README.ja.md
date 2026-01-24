# Agent Skills Collection (エージェント・スキル・コレクション)

AIコーディングアシスタント向けの再利用可能なエージェントスキルのコレクションです。GitHub Copilot CLI、Claude Code、Codex、Cursor、および [Agent Skills specification](https://agentskills.io) をサポートするその他のAIエージェントと互換性があります。

## 🚀 クイックスタート

[skills](https://github.com/vercel-labs/skills) を使用してスキルをインストールします：

```bash
# 全てのスキルをインストール
npx skills add Keiji-Miyake/agent-skills

# 特定のスキルをインストール
npx skills add Keiji-Miyake/agent-skills --skill dev-support

# グローバルにインストール（全てのプロジェクトで利用可能）
npx skills add Keiji-Miyake/agent-skills -g

# エージェントを明示的に指定（自動検出が機能しない場合）
npx skills add Keiji-Miyake/agent-skills -a gemini-cli
npx skills add Keiji-Miyake/agent-skills -a github-copilot -a codex
```

## 📦 利用可能なスキル

### dev-support

**短時間で中断が発生しやすい開発セッションに最適化されたプロジェクト管理スキル。**

- ✅ セッション時間管理（15/30/45/60/90分）
- ✅ 中断を跨いだコンテキストの保持
- ✅ ドキュメント駆動開発（SPEC, DESIGN, TEST_PLAN, ROADMAP）
- ✅ アーキテクチャ整合性のチェック
- ✅ ADR（Architecture Decision Records）サポート
- ✅ 技術スタック不問
- ✅ 二層構造のドキュメント（プロジェクトレベル + 機能レベル）

**使用場面：**
- 短時間の細切れなセッションで作業する場合
- コーディングの前に機能設計が必要な場合
- 技術ドキュメントを作成する場合
- 休憩中に作業コンテキストを管理する場合
- 中断後に作業を再開する場合

**詳細：** [skills/dev-support/README.ja.md](./skills/dev-support/README.ja.md)

### architect

**要件定義とシステム設計の専門家。**

- ✅ 抽象的な要求を技術仕様 (`SPEC.md`) に変換
- ✅ Mermaid図を用いたシステム可視化
- ✅ プロジェクトに最適な技術選定

### developer

**実装とコーディングの専門家。**

- ✅ 仕様書に基づく高品質な実装
- ✅ プロジェクト規約と構造の遵守
- ✅ ポリグロット対応（TS, Python, Go, Rust等）

### qa

**品質保証とテストの専門家。**

- ✅ 「壊す」ためのテスト計画策定
- ✅ エッジケースの網羅的検証
- ✅ 自動テストコードの実装

### devops

**インフラ構築とデプロイの専門家。**

- ✅ IaC (Infrastructure as Code) の推進
- ✅ CI/CDパイプラインの構築
- ✅ プラットフォーム非依存の最適化

## 🎯 インストールパス

| エージェント | プロジェクトパス | グローバルパス |
|-------|--------------|-------------|
| GitHub Copilot CLI | `.github/skills/` | `~/.copilot/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `.codex/skills/` | `~/.codex/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` |
| Antigravity | `.agent/skills/` | `~/.gemini/antigravity/skills/` |

## 📖 Agent Skills とは？

Agent Skills は、AIコーディングアシスタントへの指示を含む `SKILL.md` ファイルを格納したディレクトリです。[Agent Skills specification](https://agentskills.io) に準拠しており、複数のAIプラットフォームで互換性があります。

**主な利点：**
- **再利用可能**: 一度書けば、異なるAIエージェントで利用可能
- **共有可能**: Gitリポジトリ経由で配布可能
- **コンテキスト効率**: 段階的開示によりトークン使用量を最小化
- **ポータブル**: あらゆる技術スタックで動作

## 🛠️ 開発環境

このリポジトリには、エージェントスキルの開発とテストのためのツールが含まれています。

### セットアップ

```bash
# 依存関係のインストール
npm install

# 全てのスキルを検証
npm run validate

# 特定のスキルをテスト
npm run test dev-support

# 新しいスキルを作成
npm run create-skill my-new-skill
```

### スキルの構造

各スキルは以下の構造に従います：

```
skills/skill-name/
├── SKILL.md              # 必須: 指示とメタデータ
├── README.md             # 任意: 人間向けのドキュメント
├── scripts/              # 任意: ヘルパースクリプト
├── references/           # 任意: 追加ドキュメント
└── assets/              # 任意: テンプレートとリソース
```

## 🔧 トラブルシューティング

### インストール時にエージェントが検出されない

> **注**: この問題は`skills`ツールのエージェント検出ロジックによるものです。このリポジトリ（agent-skills）の問題ではありません。

`skills add`でAIエージェントが自動検出されない場合は、`-a, --agent`オプションを使用して明示的に指定できます：

```bash
# Gemini CLIの場合
npx skills add Keiji-Miyake/agent-skills -a gemini-cli

# GitHub Copilotの場合
npx skills add Keiji-Miyake/agent-skills -a github-copilot

# 複数のエージェントを指定
npx skills add Keiji-Miyake/agent-skills -a gemini-cli -a codex
```

**なぜエージェントが検出されないのか？**

`skills`ツールは、各エージェントの設定ディレクトリの存在を確認してエージェントを検出します：

| エージェント | 検出ディレクトリ | 備考 |
|-------|-------------------|-------|
| Gemini CLI | `~/.gemini` | 基底ディレクトリを確認 |
| GitHub Copilot | `~/.copilot` または `.github` | いずれかのディレクトリを確認 |
| Codex | `~/.codex` | 基底ディレクトリを確認 |
| Claude Code | `~/.claude` | 基底ディレクトリを確認 |
| Cursor | `~/.cursor` | 基底ディレクトリを確認 |

エージェントをインストール済みでもディレクトリが存在しない場合は、以下の対処法があります：
1. 基底ディレクトリを手動で作成: `mkdir -p ~/.gemini` (スキルは`~/.gemini/skills`にインストールされます)
2. または `-a` オプションでエージェントを明示的に指定 (推奨)

**まとめ**: Gemini CLIがインストール済みでも`~/.gemini`ディレクトリが存在しない場合、`skills`はGemini CLIを検出できません。この場合、`-a gemini-cli`オプションを使用して明示的に指定することで、Gemini CLIへのスキルインストールが可能になります。

### 利用可能なエージェント一覧を確認

サポートされている全てのエージェントとインストールパスは、上記の[インストールパス](#-インストールパス)セクションをご確認ください。

## 🤝 貢献

貢献を歓迎します！詳細は [CONTRIBUTING.ja.md](./CONTRIBUTING.ja.md) をお読みください。

### 新しいスキルの追加

1. `skills/` 内に新しいディレクトリを作成します
2. 必要なフロントマターを含む `SKILL.md` ファイルを追加します：
   ```markdown
   ---
   name: your-skill-name
   description: このスキルが何をするのか、いつ使うのかの簡潔な説明
   ---
   
   # スキル名
   
   AIエージェントへの指示...
   ```
3. 人間向けの `README.md` を追加します
4. AIエージェントでスキルをテストします
5. プルリクエストを送信します

## 📝 ライセンス

MITライセンス - 詳細は [LICENSE](./LICENSE) をご覧ください。

## 🔗 関連リンク

- [Agent Skills Specification](https://agentskills.io)
- [skills CLI tool](https://github.com/vercel-labs/skills)
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [SkillsMP Marketplace](https://skillsmp.com)

## 🌟 スター

もしこれらのスキルが役に立ったら、このリポジトリにスターをお願いします！ ⭐
