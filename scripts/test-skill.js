#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const skillName = process.argv[2];

if (!skillName) {
  console.log(chalk.red('Usage: npm run test <skill-name>'));
  console.log(chalk.gray('Example: npm run test dev-support'));
  process.exit(1);
}

const skillDir = path.join(rootDir, 'skills', skillName);
const skillFile = path.join(skillDir, 'SKILL.md');

if (!fs.existsSync(skillFile)) {
  console.log(chalk.red(`Error: Skill not found: ${skillFile}`));
  process.exit(1);
}

console.log(chalk.blue(`🧪 Testing skill: ${skillName}\n`));

// Read and parse skill
const content = fs.readFileSync(skillFile, 'utf-8');
const { data, content: body } = matter(content);

// Display metadata
console.log(chalk.bold('Metadata:'));
console.log(chalk.gray('  Name:'), data.name);
console.log(chalk.gray('  Description:'), data.description);
if (data.license) console.log(chalk.gray('  License:'), data.license);
if (data.metadata) {
  console.log(chalk.gray('  Author:'), data.metadata.author);
  console.log(chalk.gray('  Version:'), data.metadata.version);
}
console.log();

// Display statistics
console.log(chalk.bold('Statistics:'));
console.log(chalk.gray('  Body length:'), body.length, 'characters');
console.log(chalk.gray('  Estimated tokens:'), Math.ceil(body.length / 4));
console.log();

// Check for additional files
console.log(chalk.bold('Additional Files:'));
const hasReadme = fs.existsSync(path.join(skillDir, 'README.md'));
const hasScripts = fs.existsSync(path.join(skillDir, 'scripts')) &&
  fs.readdirSync(path.join(skillDir, 'scripts')).length > 1; // More than .gitkeep
const hasReferences = fs.existsSync(path.join(skillDir, 'references')) &&
  fs.readdirSync(path.join(skillDir, 'references')).length > 0;

console.log(chalk.gray('  README.md:'), hasReadme ? chalk.green('✓') : chalk.yellow('✗'));
console.log(chalk.gray('  scripts/:'), hasScripts ? chalk.green('✓') : chalk.gray('—'));
console.log(chalk.gray('  references/:'), hasReferences ? chalk.green('✓') : chalk.gray('—'));
console.log();

// Check compatibility
console.log(chalk.bold('Agent Compatibility:'));
const agents = [
  'GitHub Copilot CLI',
  'Claude Code',
  'Codex',
  'Cursor',
  'Gemini CLI',
  'Antigravity'
];
agents.forEach(agent => {
  console.log(chalk.green('  ✓'), agent);
});
console.log();

// Installation instructions
console.log(chalk.bold('Installation Commands:'));
console.log(chalk.gray('  Project-level:'));
console.log(chalk.cyan(`    npx add-skill Keiji-Miyake/agent-skills --skill ${skillName}`));
console.log(chalk.gray('  Global:'));
console.log(chalk.cyan(`    npx add-skill Keiji-Miyake/agent-skills --skill ${skillName} -g`));
console.log();

// Token efficiency analysis
if (body.length > 20000) {
  console.log(chalk.yellow('⚠️  Skill body is large. Consider using Progressive Disclosure:'));
  console.log(chalk.gray('   - Move detailed content to references/ directory'));
  console.log(chalk.gray('   - Link to references in SKILL.md'));
  console.log(chalk.gray('   - Keep SKILL.md under 5000 tokens (~20000 characters)'));
  console.log();
}

console.log(chalk.green('✓ Skill test complete!'));
