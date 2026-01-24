# Agent Instructions

This project follows the [Agents.md](https://agents.md/) specification.

## General Rules

### 日本語出力の強制 (Japanese Output Enforcement)

エージェントが生成する全てのアーティファクトおよびサマリーは日本語で出力してください。

- `task.md` の項目、ステータス、サマリーを日本語で記述してください。
- `implementation_plan.md` の目標説明、変更内容、検証計画を全て日本語で記述してください。
- `walkthrough.md` の実施内容、検証結果を全て日本語で記述してください。
- `task_boundary` ツールの `TaskSummary` と `TaskStatus` も日本語で記述してください。
- ユーザーへの通知（`notify_user`）も日本語で行ってください。

### 開発原則 (Development Principles)

1.  **スキルの独立性 (Skill Independence)**: 各スキルは完全に独立しており、他の特定のスキルに依存してはならない。ワークフロー間の連携（次のステップの決定など）は、スキル定義（SKILL.md）ではなく、実行時のエージェントが状況に基づき判断する。
2.  **環境非依存のパス (Environment Agnostic Paths)**: パス指定は常にプロジェクトルートからの相対パス、または環境に依存しない抽象的な記述（例: `docs/dev/[feature-name]/`）を使用し、OSや開発環境固有の絶対パスをハードコードしない。
3.  **ドキュメント駆動 (Document-Driven)**: すべての変更は、実装の前にドキュメント（SPEC.md, DESIGN.mdなど）に反映される必要がある。
