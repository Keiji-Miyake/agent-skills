# Development Guide

This document explains how to develop, test, and maintain agent skills in this repository.

## Repository Structure

```
agent-skills/
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE               # MIT License
├── package.json          # Node.js configuration
├── .gitignore           # Git ignore rules
│
├── scripts/             # Development tools
│   ├── validate-skills.js    # Validate SKILL.md format
│   ├── test-skill.js         # Test individual skills
│   └── create-skill.js       # Scaffold new skills
│
└── skills/              # Agent skills
    └── [skill-name]/    # Individual skill
        ├── SKILL.md         # Required: Agent instructions
        ├── README.md        # Human documentation
        ├── scripts/         # Optional: Helper scripts
        ├── references/      # Optional: Detailed docs
        └── assets/         # Optional: Templates, resources
```

## Setting Up Development Environment

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Keiji-Miyake/agent-skills.git
cd agent-skills

# Install dependencies
npm install

# Verify setup
npm run validate
```

## Development Workflow

### Creating a New Skill

```bash
# Use the CLI tool (recommended)
npm run create-skill my-new-skill

# Or create manually
mkdir -p skills/my-new-skill
touch skills/my-new-skill/SKILL.md
```

### Editing SKILL.md

Follow the Agent Skills specification:

```markdown
---
name: my-skill-name
description: Brief description (1-1024 chars)
license: MIT
metadata:
  author: Keiji Miyake
  version: "1.0"
---

# My Skill Name

Instructions for the AI agent...
```

**Key principles:**
- Write for the AI agent, not humans
- Keep under 5000 tokens (~20,000 chars)
- Use Progressive Disclosure (link to references/)
- Include clear "when to use" triggers

### Testing

```bash
# Validate all skills
npm run validate

# Test specific skill
npm run test dev-support

# Manual testing with AI agent
npx skills add . --skill dev-support -a github-copilot
```

### Validation Rules

The validation script checks:

- ✅ Required fields: `name`, `description`
- ✅ Name format: lowercase, hyphens only, 1-64 chars
- ✅ Description length: 1-1024 chars
- ✅ No reserved words: `anthropic`, `claude`
- ✅ No consecutive hyphens
- ✅ Directory name matches skill name
- ⚠️ Body length: warns if >50k chars

## Progressive Disclosure Pattern

For large skills, use this pattern:

```markdown
---
name: my-large-skill
description: ...
---

# My Large Skill

## Quick Start

[Concise instructions here]

## Advanced Features

For detailed information, see:
- [API Reference](references/api.md)
- [Examples](references/examples.md)
- [Troubleshooting](references/troubleshooting.md)
```

The AI agent loads references only when needed.

## Testing with Real AI Agents

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

### Local Testing (Symlink)

```bash
# Create symlink for testing
ln -s $(pwd)/skills/dev-support ~/.copilot/skills/dev-support

# Test with your AI agent
gh copilot
```

## Maintaining Skills

### Version Updates

Update `metadata.version` in SKILL.md:

```yaml
metadata:
  author: Keiji Miyake
  version: "1.1"  # Increment version
```

### Changelog

Document changes in skill's `CHANGELOG.md`:

```markdown
## [1.1.0] - 2026-01-19

### Added
- New feature X

### Changed
- Improved Y

### Fixed
- Bug Z
```

## Token Efficiency

### Estimating Tokens

Rule of thumb: **1 token ≈ 4 characters**

```bash
# Check token estimate
npm run test my-skill
```

### Optimization Strategies

1. **Keep SKILL.md concise** (<5000 tokens)
2. **Use references/** for detailed docs
3. **Link to external docs** when appropriate
4. **Use scripts/** instead of embedding code

## Common Patterns

### Pattern 1: Simple Skill

```
skill-name/
└── SKILL.md
```

Best for: Simple, focused tasks

### Pattern 2: Documented Skill

```
skill-name/
├── SKILL.md
└── README.md
```

Best for: Skills needing human documentation

### Pattern 3: Complex Skill

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

Best for: Multi-feature skills with helper tools

## Troubleshooting

### Validation Fails

```bash
# See detailed errors
npm run validate

# Common issues:
# - Missing name/description
# - Invalid name format (use lowercase-with-hyphens)
# - Description too long (>1024 chars)
```

### Skill Not Loading

1. Check directory structure
2. Verify SKILL.md has valid frontmatter
3. Test with `skills add` directly
4. Check AI agent logs

### Token Limit Exceeded

1. Move content to `references/`
2. Link to external documentation
3. Split into multiple skills

## Best Practices

### Do ✅

- Write clear, concise instructions
- Include practical examples
- Use Progressive Disclosure
- Test with multiple AI agents
- Document when to use the skill
- Keep skills focused on one task

### Don't ❌

- Embed large code blocks
- Write for human readers (use README.md)
- Include time-sensitive information
- Use inconsistent terminology
- Create overly generic skills

## Release Process

1. Update skill version in `metadata.version`
2. Update CHANGELOG.md
3. Run `npm run validate`
4. Test with at least one AI agent
5. Commit: `git commit -m "feat(skill-name): description"`
6. Tag: `git tag v1.1.0`
7. Push: `git push && git push --tags`

## Publishing

### To GitHub

```bash
# Create repository on GitHub
gh repo create Keiji-Miyake/agent-skills --public

# Push
git remote add origin https://github.com/Keiji-Miyake/agent-skills.git
git push -u origin main
git push --tags
```

### To SkillsMP

1. Visit [skillsmp.com](https://skillsmp.com)
2. Submit your repository URL
3. Add tags and description

## Getting Help

- Open an issue on GitHub
- Check [Agent Skills Specification](https://agentskills.io)
- Review example skills in `skills/`

## Resources

- [Agent Skills Specification](https://agentskills.io)
- [skills Documentation](https://github.com/vercel-labs/skills)
- [GitHub Copilot Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
