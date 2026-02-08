# Agent Instructions

This project follows the [Agents.md](https://agents.md/) specification.

## Core Rules & Lifecycle

詳細な開発ルールとライフサイクル管理については、以下の `.agent/rules/` 配下のドキュメントを参照し、厳守してください。

- **[基本ルール](.agent/rules/general-rules.md)**: 言語強制、スキル独立性、AIレビュー等のプロジェクト全般の規約。
- **[標準開発サイクル](.agent/rules/development-cycle.md)**: Architect → Developer → QA → DevOps/Content のフェーズ移行とスキル連携フロー。

## Role Definitions

各専門スキルの詳細な振る舞いは、各スキルの `SKILL.md` に定義されています。
状況に応じて適切なスキルをロードし、上記の標準開発サイクルに従って作業を進めてください。
