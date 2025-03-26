#! /usr/bin/env bun

import select from "@inquirer/select";
import input from "@inquirer/input";
import type { Choice } from "./types/choice";
import { getDiff, getSummary, git } from "./services/git";
import formatContentWithAI from "./ai-provider/openai";

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

const branchSummary = await git.branch();
const branchChoices: Choice<string>[] = [];
for (const branch in branchSummary.branches) {
  branchChoices.push({
    name: branch,
    value: branch,
    description: branchSummary.branches[branch].label,
  });
}

const originBranch = await select({
  message: "Select the source branch to merge from",
  choices: branchChoices,
});
const targetBranch = await select({
  message: "Select the destination branch to merge into",
  choices: branchChoices,
});

const selectedLanguage = await select({
  message: "Select the output document language",
  choices: languageChoices,
});

const output_file = await input({
  message: "Enter the output file name",
  required: true,
});

async function main() {
  const diffSummary = await getSummary(targetBranch, originBranch);
  let content = await setContent(diffSummary, targetBranch, originBranch);
  content = await formatContentWithAI(content, selectedLanguage);
  await contentToMarkdown(content, output_file);
}

async function contentToMarkdown(content: string, output_file: string) {
  await Bun.write(`outputs/${output_file}.md`, content);
  console.log(`✅ File ${output_file}.md created successfully`);
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
