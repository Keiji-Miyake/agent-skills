# Tech Storyteller Skill

リポジトリの履歴や作業ログから「開発の物語」を掘り起こす、アウトプットの先道役。

**Version**: 1.0  
**Author**: Keiji Miyake

## 概要

`tech-storyteller` は、日々の開発作業の中に埋もれている「ブログのネタ」を見つけ出し、執筆に最適な形に整理することを目的としています。リポジトリそのものをソースとして活用し、正確で具体的な情報を収集します。

## インストール方法

```bash
npx skills add Keiji-Miyake/agent-skills --skill tech-storyteller
```

## 主な機能

- **履歴からのネタ抽出**: Git コミットや diff を解析し、変更の要点をまとめます。
- **意思決定プロセスの可視化**: 設計プランやタスクリストから、開発の「なぜ」を抽出します。
- **記事素材の構造化**: Markdown 形式で情報を整理・出力し、様々なアウトプット（ブログ、ドキュメント、リリースノート）に活用できるようにします。

## 対応エージェント

- GitHub Copilot CLI
- Claude Code
- Gemini CLI / Cursor
- その他 Agent Skills 互換エージェント

## ライセンス

MIT License
