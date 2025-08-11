#!/usr/bin/env bun

import select from "@inquirer/select";
import input from "@inquirer/input";
import fs from "fs";
import path from "path";
import type { Choice } from "./types/choice";
import { getDiff, getSummary, git } from "./services/git";
import { aiProviderChoices, getAIProvider } from "./ai-provider";
import { getTemplateByName, getTemplateChoices, getTemplateContent } from "./services/template-loader";
import { getModelsForProvider, countTokensApprox, estimateCost, type ModelConfig } from "./ai-provider/models";

// Define language choices
const languageChoices: Choice<string>[] = [
  {
    name: "English",
    value: "en",
    description: "Generate the document in English",
  },
  {
    name: "Spanish",
    value: "es",
    description: "Generate the document in Spanish",
  },
];

// Get branches
const branchSummary = await git.branch();
const branchChoices: Choice<string>[] = [];
for (const branch in branchSummary.branches) {
  branchChoices.push({
    name: branch,
    value: branch,
    description: branchSummary.branches[branch].label,
  });
}

// Select AI provider
const selectedProvider = await select({
  message: "Select the AI provider to use",
  choices: aiProviderChoices,
});

// Get available models for the selected provider
const availableProviderModels = getModelsForProvider(selectedProvider);
const modelChoices: Choice<string>[] = availableProviderModels.map((model) => ({
  name: `${model.name} - $${model.inputTokenCost}/$${model.outputTokenCost} per 1M tokens`,
  value: model.id,
  description: model.description,
}));

// Select model
const selectedModelId = await select({
  message: "Select the model to use",
  choices: modelChoices,
});

const selectedModel = availableProviderModels.find(m => m.id === selectedModelId)!;

// Get template choices and select a template
const templateChoices = await getTemplateChoices();
const selectedTemplate = await select({
  message: "Select the template to use (add more in ~/.pullai/templates/)",
  choices: templateChoices,
});

// Select branches
const originBranch = await select({
  message: "Select the source branch to merge from",
  choices: branchChoices,
});

// Select target branch
const targetBranch = await select({
  message: "Select the destination branch to merge into",
  choices: branchChoices,
});

// Select language
const selectedLanguage = await select({
  message: "Select the output document language",
  choices: languageChoices,
});

// Select output file name
const output_file = await input({
  message: "Enter the output file name",
  required: true,
});

async function main() {
  try {
    const diffSummary = await getSummary(targetBranch, originBranch);
    let content = await setContent(diffSummary, targetBranch, originBranch);

    // Get the selected AI provider and template
    const aiProvider = getAIProvider(selectedProvider);
    const template = await getTemplateByName(selectedTemplate);

    // Create a template function that uses the loaded template content
    const templateFunction = (rawDiff: string, language: string) => {
      return getTemplateContent(rawDiff, language, template.content);
    };

    // Estimate cost before making the API call
    const prompt = templateFunction(content, selectedLanguage);
    const inputTokens = countTokensApprox(prompt);
    const estimatedOutputTokens = Math.ceil(inputTokens * 0.5); // Estimate output as 50% of input
    const estimatedCost = estimateCost(inputTokens, estimatedOutputTokens, selectedModel);

    console.log(`\n📊 Cost Estimation:`);
    console.log(`   Model: ${selectedModel.name}`);
    console.log(`   Input tokens: ~${inputTokens.toLocaleString()}`);
    console.log(`   Estimated output tokens: ~${estimatedOutputTokens.toLocaleString()}`);
    console.log(`   Estimated cost: $${estimatedCost.toFixed(4)}`);
    console.log('');

    try {
      // Use the selected template and AI provider
      content = await aiProvider.formatContentWithAI(
        content,
        selectedLanguage,
        templateFunction,
        selectedModel
      );
      await contentToMarkdown(content, output_file);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error using ${aiProvider.name} provider: ${error.message}`);
        if (aiProvider.value === "deepseek" && !process.env.DEEPSEEK_API_KEY) {
          console.error("Please set the DEEPSEEK_API_KEY environment variable:");
          console.error("export DEEPSEEK_API_KEY=your_deepseek_api_key");
        } else if (aiProvider.value === "openai" && !process.env.OPENAI_API_KEY) {
          console.error("Please set the OPENAI_API_KEY environment variable:");
          console.error("export OPENAI_API_KEY=your_openai_api_key");
        }
      } else {
        console.error("❌ An unknown error occurred");
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ An error occurred:", error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  }
}

async function contentToMarkdown(content: string, output_file: string) {
  // Get the user's home directory
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  let outputDir = 'outputs';
  let outputPath = `outputs/${output_file}.md`;

  // If we have a home directory, use a .pullai/outputs directory there
  if (homeDir) {
    // Create .pullai directory if it doesn't exist
    const pullaiDir = path.join(homeDir, '.pullai');
    if (!fs.existsSync(pullaiDir)) {
      fs.mkdirSync(pullaiDir);
    }

    // Create outputs directory if it doesn't exist
    const userOutputDir = path.join(pullaiDir, 'outputs');
    if (!fs.existsSync(userOutputDir)) {
      fs.mkdirSync(userOutputDir);
    }

    outputDir = userOutputDir;
    outputPath = path.join(userOutputDir, `${output_file}.md`);
  } else {
    // Fallback to local outputs directory
    if (!fs.existsSync('outputs')) {
      fs.mkdirSync('outputs');
    }
  }

  // Write the content to the file
  if (typeof Bun !== 'undefined') {
    // Use Bun's write method when available
    await Bun.write(outputPath, content);
  } else {
    // Use Node.js fs when Bun is not available
    await fs.promises.writeFile(outputPath, content, 'utf-8');
  }
  console.log(`✅ File ${output_file}.md created successfully in ${outputDir}/${output_file}.md`);
}

async function setContent(
  files: string[],
  targetBranch: string,
  originBranch: string
) {
  console.log(`🔍 Getting differences`);
  let content = "";
  for (const file of files) {
    content += await getDiff(targetBranch, originBranch, file);
  }
  return content;
}

main();
