# Contributing to Agent Skills Collection

Thank you for your interest in contributing! This document provides guidelines for contributing new skills or improving existing ones.

## Getting Started

1. Fork this repository
2. Clone your fork: `git clone https://github.com/your-username/agent-skills.git`
3. Create a branch: `git checkout -b feature/my-new-skill`
4. Install dependencies: `npm install`

## Adding a New Skill

### Option 1: Using the CLI Tool

```bash
npm run create-skill my-awesome-skill
```

This creates a complete skill template with:
- `SKILL.md` (required)
- `README.md` (documentation)
- `scripts/` directory
- `references/` directory

### Option 2: Manual Creation

1. Create a directory: `mkdir -p skills/my-awesome-skill`
2. Create `SKILL.md` with required frontmatter:

```markdown
---
name: my-awesome-skill
description: Brief description of what this skill does and when to use it
license: MIT
metadata:
  author: Your Name
  version: "1.0"
---

# My Awesome Skill

[Skill instructions...]
```

## SKILL.md Requirements

### Required Fields (YAML Frontmatter)

- `name`: Lowercase, hyphens only, 1-64 characters
- `description`: 1-1024 characters, describes what and when

### Optional Fields

- `license`: License type (e.g., MIT, Apache-2.0)
- `metadata`: Author, version, tags
- `compatibility`: Special requirements
- `allowed-tools`: Specific tools this skill can use

### Best Practices

1. **Keep it concise**: Aim for <5000 tokens (~20,000 characters)
2. **Progressive disclosure**: Use `references/` for detailed docs
3. **Clear instructions**: Write for the AI agent, not humans
4. **Examples**: Include practical examples
5. **When to use**: Clearly state trigger scenarios

## Skill Naming Guidelines

✅ **Good names:**
- `git-commit-helper`
- `analyzing-spreadsheets`
- `managing-databases`

❌ **Bad names:**
- `helper` (too vague)
- `utils` (too generic)
- `MySkill` (must be lowercase)
- `my--skill` (no consecutive hyphens)

## Testing Your Skill

```bash
# Validate all skills
npm run validate

# Test a specific skill
npm run test my-awesome-skill
```

## Documentation

Each skill should include:

1. **SKILL.md**: Instructions for the AI agent (required)
2. **README.md**: Human-readable documentation (recommended)
3. **references/**: Additional detailed documentation (optional)
4. **scripts/**: Helper scripts (optional)

## Pull Request Process

1. Ensure your skill passes validation: `npm run validate`
2. Test with at least one AI agent (Copilot, Claude, etc.)
3. Update the main README.md to list your skill
4. Write a clear PR description explaining:
   - What the skill does
   - When to use it
   - Which agents you tested with
   - Any special requirements

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the quality and usefulness of skills
- Help others learn and improve

## Questions?

Open an issue if you have questions or need help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
