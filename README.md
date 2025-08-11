# 🤖 PULLAI - AI-Powered Pull Request Descriptions

![GitHub](https://img.shields.io/badge/pullai-v1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

PULLAI is a command-line tool that automatically generates descriptive and well-formatted pull request descriptions from Git diffs using AI. Save time and improve your PR documentation with smart, AI-generated content.

**🚀 Works with both Node.js and Bun** - No complex setup required!

## 🎬 Demo

https://github.com/user-attachments/assets/a14e78d5-395d-4d79-848e-40342ac9a7b5

## ✨ Features

- 🔄 Compare any two Git branches
- 🌐 Generate descriptions in multiple languages (English, Spanish)
- 📝 Create well-structured Markdown documents
- 🧠 AI-powered analysis of code changes with multiple AI providers (OpenAI, Deepseek)
- 🎯 Choose from multiple models for each provider with cost estimation
- 📋 Multiple templates for different PR description styles (Standard, Concise, Detailed)
- 💰 Real-time cost estimation before making API calls
- 🔍 Detailed breakdown of modifications, additions, and deletions

## 📋 Table of Contents

- [Installation](#-installation)
- [Usage](#-usage)
- [Examples](#-examples)
- [Configuration](#-configuration)
- [License](#-license)

## 📦 Installation

### Prerequisites

No prerequisites needed! The tool works with both Node.js and Bun out of the box.
- **Node.js** (v14+) - Most users already have this
- **Bun** (optional) - For faster performance

### Using npx (No installation required)

```bash
# Run directly with npx
npx pullai

# Or with bunx if you have Bun installed
bunx pullai
```

### Using npm

```bash
# Install globally
npm install -g pullai

# Then run
pullai
```

### Using Bun

```bash
# Install globally
bun install -g pullai

# Then run
pullai
```

### Development Installation

If you're developing or modifying the tool:

```bash
# Clone the repository
git clone https://github.com/elvisbrevi/pullai.git
cd pullai

# Install dependencies
bun install  # or npm install

# Run in development mode
bun run dev  # or bun app/main.ts

# Build for distribution
bun run build
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
2. Select the model to use (with cost information displayed)
3. Select the template to use (Standard, Concise, or Detailed)
4. Select the source branch (branch with changes)
5. Select the destination branch (branch to merge into)
6. Choose your preferred language for the output
7. Enter a name for the output file

Before making the API call, you'll see a cost estimation showing:
- Selected model
- Estimated input/output tokens
- Estimated cost in USD

The generated file will be saved in the `~/.pullai/outputs/` directory in your home folder, making it easily accessible for future reference.

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

### File Locations

When PULLAI is installed, it creates the following directories in your home folder:

- `~/.pullai/templates/` - Contains your custom templates
- `~/.pullai/outputs/` - Contains your generated PR descriptions

These directories are created automatically the first time you run the application. The default templates are copied to your templates directory, allowing you to customize them without affecting the original installation.

### Custom Templates

PULLAI supports custom templates for PR descriptions. You can create your own templates by adding markdown files to the `~/.pullai/templates/` directory.

To create a custom template:

1. Create a markdown file (e.g., `my-template.md`) in the `~/.pullai/templates/` directory
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

### AI Models

PULLAI supports multiple models from each provider with transparent pricing:

**OpenAI Models:**
- `gpt-5` - Latest state-of-the-art model with advanced reasoning ($1.25/$10.00 per 1M tokens)
- `gpt-5-mini` - Efficient GPT-5 variant optimized for cost/performance balance ($0.25/$2.00 per 1M tokens)
- `gpt-5-nano` - Ultra-efficient GPT-5 for high-volume, cost-sensitive applications ($0.05/$0.40 per 1M tokens)
- `gpt-4o` - Multimodal model with excellent performance ($5.00/$15.00 per 1M tokens)
- `gpt-4o-mini` - Most cost-efficient small model, 60% cheaper than GPT-3.5 Turbo ($0.15/$0.60 per 1M tokens)
- `gpt-4-turbo` - Previous generation high-intelligence ($10.00/$30.00 per 1M tokens)
- `gpt-3.5-turbo` - Fast and inexpensive ($0.50/$1.50 per 1M tokens)

**Deepseek Models:**
- `deepseek-reasoner` - Advanced reasoning with step-by-step thinking ($0.55/$2.19 per 1M tokens)
- `deepseek-chat` - General-purpose conversational model ($0.14/$0.28 per 1M tokens)

Cost estimation is provided before each API call, helping you make informed decisions about model selection.

## 📄 License

MIT

---

Made with ❤️ using [OpenAI](https://openai.com/), [Deepseek](https://deepseek.com/), [Bun](https://bun.sh/), and [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
