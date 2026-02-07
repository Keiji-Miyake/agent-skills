# Changelog

すべての変更はこのファイルに記録されます。

## [Unreleased]

### Added
- **New Skills**:
    - `architect`: 要件定義、システム設計、Mermaid図作成
    - `developer`: ポリグロット対応の実装、リファクタリング
    - `qa`: テスト計画、自動テスト実装、エッジケース検証
    - `devops`: IaC、CI/CDパイプライン構築
    - `blog-writer`: 技術ブログの執筆・編集（SEO、Mermaid図解対応）
    - `tech-storyteller`: リポジトリ履歴からの素材収集
    - `tech-writer`: 技術ブログ執筆支援（既存スキルのブログ化等）
    - `dev-ready`: 開発開始前チェック（Status, Context, Taskの自動確認）
- **Workflows**:
    - `dev-ready`: Gemini CLI向けの初期化・現状確認ワークフロー
- **AGENTS.md**: エージェント向け指示書（日本語出力、コミットメッセージルール）

### Changed
- **dev-support**:
    - ワークフローにAIによるダブルチェック（Github Copilot CLI / Gemini CLI等）を必須化
    - ディレクトリ構成を `.agent/skills` から `skills/` へ正式移動
- **Documentation**:
    - `README.ja.md` に新スキルの説明を追加
    - `.agent/instructions.md` を `AGENTS.md` に統合・移動
