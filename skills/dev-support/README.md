# Dev Support Skill

Project management skill - optimized for short, interruptible development sessions.

**Version**: 2.2  
**Rating**: S (Excellent) - 99% Achievement

## Overview

This skill minimizes context loss in development environments where interruptions and resumptions occur frequently.
**Technology agnostic** and can be used in any project.
**Flexible work sessions**: 15/30/45/60/90 minutes, adjustable to your schedule.

### New in v2.2
- **Two-tier documentation structure**: Documentation management for the entire project and individual features.
- **Architecture alignment**: Automatically check if new features align with existing design.
- **ADR (Architecture Decision Records)**: Record and track technical decisions.
- **Feature dependency management**: Visualize relationships between features in development.
- **Document maturity support**: Recommend documentation structures based on project scale (Startup/Growing/Mature).

### Key Features
- **Specification design support**: Organize requirements in `SPEC.md`.
- **Architecture design**: Record technical choices and configuration in `DESIGN.md`.
- **Project-wide design**: Manage the entire system in `ARCHITECTURE.md`.
- **Test planning**: Manage test cases in `TEST_PLAN.md`.
- **Progress management**: Track milestones in `ROADMAP.md`.
- **Work context preservation**: Support interruption/resumption with `CONTEXT.md`.
- **Flexible time management**: Customizable session times.

## Installation

```bash
# Create skill directory if it doesn't exist
mkdir -p ~/.gemini/skills/dev-support

# Copy the contents of this directory
cp -r . ~/.gemini/skills/dev-support/

# Optional: Symbolic link for Antigravity
ln -s ~/.gemini/skills/dev-support ~/.gemini/antigravity/skills/dev-support
```

## Usage

### 1. Start work in the project folder

```bash
cd ~/my-project

# Start the AI agent
gh copilot  # or gemini cli, antigravity, etc.
```

### 2. Set session time

```
> Resume work. 45 minutes this time.
```

The agent will read `docs/dev/**/CONTEXT.md` and tell you the status of the last session.

### 3. Start new feature development

```
> Start developing "user profile editing" for 60 minutes.
```

### 4. Interrupt work

```
> Interrupt work.
```

See `SKILL.md` for more details.

## Helper Tools (Optional)

You can assist document management with `scripts/manage-dev.ts`.

```bash
cd ~/.gemini/skills/dev-support/scripts
pnpm install
pnpm tsx manage-dev.ts summary
```

## Supported Agents

- GitHub Copilot CLI
- Gemini CLI
- Anthropic Claude (Claude Code, Claude.ai, API)
- Antigravity
- Other compatible agents

## License

MIT License
