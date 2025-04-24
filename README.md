# 🤖 PULLAI - AI-Powered Pull Request Descriptions

![GitHub](https://img.shields.io/badge/pullai-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

PULLAI is a command-line tool that automatically generates descriptive and well-formatted pull request descriptions from Git diffs using AI. Save time and improve your PR documentation with smart, AI-generated content.

## ✨ Features

- 🔄 Compare any two Git branches
- 🌐 Generate descriptions in multiple languages (English, Spanish)
- 📝 Create well-structured Markdown documents
- 🧠 AI-powered analysis of code changes with multiple AI providers (OpenAI, Deepseek)
- 📋 Multiple templates for different PR description styles (Standard, Concise, Detailed)
- 🔍 Detailed breakdown of modifications, additions, and deletions

## 📋 Table of Contents

- [Installation](#-installation)
- [Usage](#-usage)
- [Examples](#-examples)
- [Configuration](#-configuration)
- [License](#-license)

## 📦 Installation

### Using npm

```bash
# Install globally
npm install -g pullai

# Or install locally in a project
npm install pullai
```

### Using Bun

Ensure you have [Bun](https://bun.sh/) installed, then:

```bash
# Install globally
bun install -g pullai

# Or install locally in a project
bun install pullai
```

You'll need to set environment variables for the API keys of the AI providers you want to use:

```bash
# For OpenAI
export OPENAI_API_KEY=your-openai-api-key

# For Deepseek
export DEEPSEEK_API_KEY=your-deepseek-api-key
```

Note: The application directly uses these environment variables, not .env files. Make sure to export them in your terminal session before running the application.

## 🚀 Usage

Run the tool with:

```bash
pullai
```

Then follow the interactive prompts:

1. Select the AI provider to use (OpenAI or Deepseek)
2. Select the template to use (Standard, Concise, or Detailed)
3. Select the source branch (branch with changes)
4. Select the destination branch (branch to merge into)
5. Choose your preferred language for the output
6. Enter a name for the output file

The generated file will be saved in the `outputs/` directory.

## 📝 Examples

### Example Output

Here's a sample of what a generated PR description might look like:

```markdown
# Description

This PR introduces a major refactoring of the code structure, improving modularity
by separating AI and Git services into individual modules. The change enhances
maintainability and creates a cleaner architecture.

# Added Files

- app/ai-provider/openai.ts
- app/services/git.ts
- app/types/choice.ts

# Modified Files

- package.json
- app/main.ts

# Deleted Files

- src/main.ts

# Change Details

## app/ai-provider/openai.ts

This new file encapsulates all OpenAI API interactions, implementing a dedicated
function `formatContentWithAI` that handles PR description generation with
multilingual support.

## app/services/git.ts

This module contains all Git-related functionality, including methods to retrieve
branch differences and parse Git diffs. It implements proper error handling and
excludes irrelevant files from processing.
```

## ⚙️ Configuration

### Ignored Files

PULLAI automatically ignores certain files when analyzing diffs:

```typescript
const ignoredFiles = [
  "node_modules",
  ".idea/",
  ".lock",
  ".env",
  ".npmrc",
  ".gitignore",
  "package-lock.json",
];
```

You can modify this list in `app/services/git.ts` to customize which files to exclude.

### Custom Templates

PULLAI supports custom templates for PR descriptions. You can create your own templates by adding markdown files to the `templates` directory in your global npm installation directory.

To create a custom template:

1. Create a markdown file (e.g., `my-template.md`) in the `templates` directory
2. Use the following placeholders in your template:
   - `{{language}}`: Will be replaced with "English" or "Spanish" based on the selected language
   - `{{diff}}`: Will be replaced with the Git diff content

Example custom template:

```markdown
# PR Summary for {{language}} Review

## Overview

This PR makes the following changes:

{{diff}}

## Checklist

- [ ] Code follows the style guidelines
- [ ] Documentation has been updated
- [ ] Tests have been added/updated
```

When you run PULLAI, your custom templates will appear in the template selection menu alongside the built-in templates.

## 📄 License

MIT

---

Made with ❤️ using [OpenAI](https://openai.com/), [Deepseek](https://deepseek.com/), [Bun](https://bun.sh/), and [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
