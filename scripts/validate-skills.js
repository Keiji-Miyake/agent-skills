#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Validate all SKILL.md files in the repository
 */
async function validateSkills() {
  console.log(chalk.blue('🔍 Validating agent skills...\n'));

  const skillFiles = await glob('skills/**/SKILL.md', { cwd: rootDir });
  
  if (skillFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No SKILL.md files found'));
    return process.exit(1);
  }

  let hasErrors = false;
  const results = [];

  for (const skillFile of skillFiles) {
    const fullPath = path.join(rootDir, skillFile);
    const skillName = path.dirname(skillFile).split('/').pop();
    const content = fs.readFileSync(fullPath, 'utf-8');

    try {
      const { data, content: body } = matter(content);
      const errors = [];
      const warnings = [];

      // Required fields
      if (!data.name) {
        errors.push('Missing required field: name');
      } else if (!/^[a-z0-9-]+$/.test(data.name)) {
        errors.push('Invalid name format (must be lowercase with hyphens only)');
      } else if (data.name !== skillName) {
        warnings.push(`Directory name (${skillName}) doesn't match skill name (${data.name})`);
      }

      if (!data.description) {
        errors.push('Missing required field: description');
      } else if (data.description.length > 1024) {
        errors.push('Description exceeds 1024 characters');
      }

      // Optional fields validation
      if (data.name && (data.name.includes('anthropic') || data.name.includes('claude'))) {
        warnings.push('Name contains reserved words (anthropic/claude)');
      }

      if (data.name && (data.name.startsWith('-') || data.name.endsWith('-'))) {
        errors.push('Name cannot start or end with hyphen');
      }

      if (data.name && data.name.includes('--')) {
        errors.push('Name cannot contain consecutive hyphens');
      }

      // Content validation
      if (!body || body.trim().length === 0) {
        warnings.push('Skill body is empty');
      } else if (body.length > 50000) {
        warnings.push('Skill body is very large (>50k chars). Consider using references/');
      }

      results.push({
        skill: data.name || skillName,
        path: skillFile,
        errors,
        warnings,
        valid: errors.length === 0
      });

      if (errors.length > 0) hasErrors = true;

    } catch (error) {
      results.push({
        skill: skillName,
        path: skillFile,
        errors: [`Failed to parse: ${error.message}`],
        warnings: [],
        valid: false
      });
      hasErrors = true;
    }
  }

  // Print results
  results.forEach(result => {
    if (result.valid && result.warnings.length === 0) {
      console.log(chalk.green('✓'), chalk.bold(result.skill), chalk.gray(`(${result.path})`));
    } else {
      console.log(chalk.yellow('⚠'), chalk.bold(result.skill), chalk.gray(`(${result.path})`));
      
      result.errors.forEach(error => {
        console.log(chalk.red('  ✗'), error);
      });
      
      result.warnings.forEach(warning => {
        console.log(chalk.yellow('  ⚠'), warning);
      });
    }
    console.log();
  });

  // Summary
  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;
  
  console.log(chalk.bold('\nSummary:'));
  console.log(chalk.green(`✓ ${validCount}/${totalCount} skills valid`));
  
  if (hasErrors) {
    console.log(chalk.red(`\n✗ Validation failed with errors`));
    process.exit(1);
  } else if (results.some(r => r.warnings.length > 0)) {
    console.log(chalk.yellow(`\n⚠ Validation passed with warnings`));
  } else {
    console.log(chalk.green(`\n✓ All skills are valid!`));
  }
}

validateSkills().catch(error => {
  console.error(chalk.red('Error:'), error);
  process.exit(1);
});
