# General Rules

## 日本語出力の強制 (Japanese Output Enforcement)

エージェントが生成する全てのアーティファクトおよびサマリーは日本語で出力してください。

- `task.md` の項目、ステータス、サマリーを日本語で記述してください。
- `implementation_plan.md` の目標説明、変更内容、検証計画を全て日本語で記述してください。
- `walkthrough.md` の実施内容、検証結果を全て日本語で記述してください。
- `task_boundary` ツールの `TaskSummary` と `TaskStatus` も日本語で記述してください。
- ユーザーへの通知（`notify_user`）も日本語で行ってください。

## 開発原則 (Development Principles)

1.  **スキルの独立性 (Skill Independence)**: 各スキルは完全に独立しており、他の特定のスキルに依存してはならない。ワークフロー間の連携（次のステップの決定など）は、スキル定義（SKILL.md）ではなく、実行時のエージェントが状況に基づき判断する。
2.  **環境非依存のパス (Environment Agnostic Paths)**: パス指定は常にプロジェクトルートからの相対パス、または環境に依存しない抽象的な記述（例: `docs/dev/[feature-name]/`）を使用し、OSや開発環境固有の絶対パスをハードコードしない。
3.  **ドキュメント駆動 (Document-Driven)**: すべての変更は、実装の前にドキュメント（SPEC.md, DESIGN.mdなど）に反映される必要がある。
4.  **AIレビューの必須化 (Mandatory AI Review)**:
    - 重要なドキュメント（SPEC.md, DESIGN.md等）の作成後だけでなく、**全てのコミットおよびプッシュの前**に、必ず「自分以外の」AIモデルまたはAIエージェント（Gemini CLI, GitHub Copilot CLI等）による客観的なレビューを実行してください。
    - 指摘事項がある場合は内容を検討し、必要な修正を行った上でコミットしてください。
    - レビュー結果は作業ログ（walkthrough.md等）に記録するか、ユーザーに提示してください。
5.  **スクリプトの品質管理 (Script Quality Control)**: スキル内に `scripts` ディレクトリが存在する場合、コードの変更や新規作成の際には必ず適切なツールによる構文チェックとフォーマットを実行し、品質を維持しなければならない。
    - **TypeScript / JavaScript**: `biome`, `eslint`, `prettier` 等（Biome は高速かつ設定がシンプルで推奨されるが、プロジェクトや言語の性質に合わせて適切なものを選択すること）
    - **Python**: `ruff`, `black`, `flake8` 等
    - **Go**: `go fmt`, `go vet`, `golangci-lint` 等
    - その他言語についても、その言語の標準的な linter/formatter を使用すること。
