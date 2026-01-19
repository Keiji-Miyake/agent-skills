# Agent Skills Collection

[日本語版はこちら](./README.ja.md)


A collection of reusable agent skills for AI coding assistants. Compatible with GitHub Copilot CLI, Claude Code, Codex, Cursor, and other AI agents that support the [Agent Skills specification](https://agentskills.io).

## 🚀 Quick Start

Install skills using [add-skill](https://github.com/vercel-labs/add-skill):

```bash
# Install all skills
npx add-skill Keiji-Miyake/agent-skills

# Install specific skill
npx add-skill Keiji-Miyake/agent-skills --skill dev-support

# Install globally (available to all projects)
npx add-skill Keiji-Miyake/agent-skills -g

# Specify agent explicitly (if auto-detection doesn't work)
npx add-skill Keiji-Miyake/agent-skills -a gemini-cli
npx add-skill Keiji-Miyake/agent-skills -a github-copilot -a codex
```

## 📦 Available Skills

### dev-support

**Project management skill optimized for short, interruptible development sessions.**

- ✅ Session time management (15/30/45/60/90 minutes)
- ✅ Context preservation across interruptions
- ✅ Documentation-driven development (SPEC, DESIGN, TEST_PLAN, ROADMAP)
- ✅ Architecture alignment checking
- ✅ ADR (Architecture Decision Records) support
- ✅ Technology stack agnostic
- ✅ Two-tier documentation structure (Project + Feature level)

**Use when:**
- Working in short, interrupted sessions
- Need to design features before coding
- Creating technical documentation
- Managing work context during breaks
- Resuming work after interruptions

**Learn more:** [skills/dev-support/README.md](./skills/dev-support/README.md)

## 🎯 Installation Paths

| Agent | Project Path | Global Path |
|-------|--------------|-------------|
| GitHub Copilot CLI | `.github/skills/` | `~/.copilot/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `.codex/skills/` | `~/.codex/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` |
| Antigravity | `.agent/skills/` | `~/.gemini/antigravity/skills/` |

## 📖 What are Agent Skills?

Agent Skills are directories containing a `SKILL.md` file that provides instructions to AI coding assistants. They follow the [Agent Skills specification](https://agentskills.io) and are compatible across multiple AI platforms.

**Key benefits:**
- **Reusable**: Write once, use across different AI agents
- **Shareable**: Distribute via Git repositories
- **Context-efficient**: Progressive disclosure minimizes token usage
- **Portable**: Works with any technology stack

## 🛠️ Development Environment

This repository includes tools for developing and testing agent skills.

### Setup

```bash
# Install dependencies
npm install

# Validate all skills
npm run validate

# Test a specific skill
npm run test dev-support

# Create a new skill
npm run create-skill my-new-skill
```

### Skill Structure

Each skill follows this structure:

```
skills/skill-name/
├── SKILL.md              # Required: Instructions and metadata
├── README.md             # Optional: Human-readable documentation
├── scripts/              # Optional: Helper scripts
├── references/           # Optional: Additional documentation
└── assets/              # Optional: Templates and resources
```

## 🔧 Troubleshooting

### Agent not detected during installation

If your AI agent is not automatically detected by `add-skill`, you can specify it explicitly using the `-a, --agent` option:

```bash
# For Gemini CLI
npx add-skill Keiji-Miyake/agent-skills -a gemini-cli

# For GitHub Copilot
npx add-skill Keiji-Miyake/agent-skills -a github-copilot

# For multiple agents
npx add-skill Keiji-Miyake/agent-skills -a gemini-cli -a codex
```

**Why isn't my agent detected?**

The `add-skill` tool detects agents by checking for their configuration directories:

| Agent | Detection Directory | Notes |
|-------|-------------------|-------|
| Gemini CLI | `~/.gemini` | Checks for base directory |
| GitHub Copilot | `~/.copilot` or `.github` | Checks for either directory |
| Codex | `~/.codex` | Checks for base directory |
| Claude Code | `~/.claude` | Checks for base directory |
| Cursor | `~/.cursor` | Checks for base directory |

If you have installed an agent but the directory doesn't exist, you can:
1. Create the base directory manually: `mkdir -p ~/.gemini` (skills will be installed to `~/.gemini/skills`)
2. Or use the `-a` option to specify the agent explicitly (recommended)

### View all available agents

To see all supported agents and their installation paths, check the [Installation Paths](#-installation-paths) section above.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Adding a New Skill

1. Create a new directory in `skills/`
2. Add a `SKILL.md` file with required frontmatter:
   ```markdown
   ---
   name: your-skill-name
   description: Brief description of what this skill does and when to use it
   ---
   
   # Your Skill Name
   
   Instructions for the AI agent...
   ```
3. Add a `README.md` for human readers
4. Test the skill with your AI agent
5. Submit a pull request

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Related Links

- [Agent Skills Specification](https://agentskills.io)
- [add-skill CLI tool](https://github.com/vercel-labs/add-skill)
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [SkillsMP Marketplace](https://skillsmp.com)

## 🌟 Star History

If you find these skills useful, please consider giving this repository a star! ⭐
