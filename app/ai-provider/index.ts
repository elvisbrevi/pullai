import type { AIProvider } from "../types/ai-provider";
import openaiFormatter from "./openai";
import deepseekFormatter from "./deepseek";

export const aiProviders: AIProvider[] = [
  {
    name: "OpenAI",
    value: "openai",
    description: "Use OpenAI's GPT models",
    formatContentWithAI: openaiFormatter,
  },
  {
    name: "Deepseek",
    value: "deepseek",
    description: "Use Deepseek's AI models",
    formatContentWithAI: deepseekFormatter,
  },
];

export function getAIProvider(providerValue: string): AIProvider {
  const provider = aiProviders.find((p) => p.value === providerValue);
  if (!provider) {
    throw new Error(`AI provider '${providerValue}' not found`);
  }
  return provider;
}
