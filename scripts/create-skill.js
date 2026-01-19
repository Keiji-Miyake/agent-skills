#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const skillName = process.argv[2];

if (!skillName) {
  console.log(chalk.red('Usage: npm run create-skill <skill-name>'));
  console.log(chalk.gray('Example: npm run create-skill my-awesome-skill'));
  process.exit(1);
}

// Validate skill name
if (!/^[a-z0-9-]+$/.test(skillName)) {
  console.log(chalk.red('Error: Skill name must be lowercase with hyphens only'));
  process.exit(1);
}

const skillDir = path.join(rootDir, 'skills', skillName);

if (fs.existsSync(skillDir)) {
  console.log(chalk.red(`Error: Skill directory already exists: ${skillDir}`));
  process.exit(1);
}

// Create skill directory structure
fs.mkdirSync(skillDir, { recursive: true });
fs.mkdirSync(path.join(skillDir, 'scripts'), { recursive: true });
fs.mkdirSync(path.join(skillDir, 'references'), { recursive: true });

// Create SKILL.md
const skillMd = `---
name: ${skillName}
description: Brief description of what this skill does and when to use it
license: MIT
metadata:
  author: Keiji Miyake
  version: "1.0"
---

# ${skillName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

This skill helps you with [describe the main purpose].

## When to Use

Use this skill when:
- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

## How It Works

1. **Step 1**: [Description]
2. **Step 2**: [Description]
3. **Step 3**: [Description]

## Examples

### Example 1: [Task Name]

\`\`\`
[Example code or command]
\`\`\`

### Example 2: [Task Name]

\`\`\`
[Example code or command]
\`\`\`

## Best Practices

- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

## Additional Resources

For more detailed information, see:
- [references/guide.md](references/guide.md)
- [references/api.md](references/api.md)
`;

fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd);

// Create README.md
const readmeMd = `# ${skillName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

[Brief description of the skill]

**Version**: 1.0  
**Author**: Keiji Miyake

## Overview

[Detailed overview of what this skill does and why it's useful]

## Installation

\`\`\`bash
# Install with add-skill
npx add-skill Keiji-Miyake/agent-skills --skill ${skillName}

# Install globally
npx add-skill Keiji-Miyake/agent-skills --skill ${skillName} -g
\`\`\`

## Usage

[Explain how to use this skill]

### Example 1

\`\`\`
[Example]
\`\`\`

### Example 2

\`\`\`
[Example]
\`\`\`

## Requirements

- [Requirement 1]
- [Requirement 2]

## Supported Agents

- GitHub Copilot CLI
- Claude Code
- Codex
- Cursor
- Gemini CLI
- Other Agent Skills-compatible agents

## License

MIT License
`;

fs.writeFileSync(path.join(skillDir, 'README.md'), readmeMd);

// Create placeholder reference files
fs.writeFileSync(
  path.join(skillDir, 'references', 'guide.md'),
  `# ${skillName} Guide\n\n[Detailed guide content]\n`
);

fs.writeFileSync(
  path.join(skillDir, 'references', 'api.md'),
  `# ${skillName} API Reference\n\n[API documentation]\n`
);

// Create .gitkeep for scripts directory
fs.writeFileSync(
  path.join(skillDir, 'scripts', '.gitkeep'),
  ''
);

console.log(chalk.green('✓ Skill created successfully!'));
console.log(chalk.gray(`\nLocation: ${skillDir}`));
console.log(chalk.gray('\nFiles created:'));
console.log(chalk.gray('  - SKILL.md'));
console.log(chalk.gray('  - README.md'));
console.log(chalk.gray('  - references/guide.md'));
console.log(chalk.gray('  - references/api.md'));
console.log(chalk.gray('  - scripts/'));
console.log(chalk.blue('\nNext steps:'));
console.log(chalk.gray('  1. Edit SKILL.md to add your skill instructions'));
console.log(chalk.gray('  2. Update README.md with human-readable documentation'));
console.log(chalk.gray('  3. Add any helper scripts to scripts/ directory'));
console.log(chalk.gray('  4. Add detailed references to references/ directory'));
console.log(chalk.gray('  5. Test your skill with: npm run test ' + skillName));
console.log(chalk.gray('  6. Validate with: npm run validate'));
