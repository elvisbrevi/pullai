import type { Choice } from "../types/choice";
import { AIProviderStrategy } from "./base-provider";
import { OpenAIProvider } from "./openai-provider";
import { DeepseekProvider } from "./deepseek-provider";

// Create instances of the AI providers
const openaiProvider = new OpenAIProvider();
const deepseekProvider = new DeepseekProvider();

// List of available AI providers
export const aiProviders: AIProviderStrategy[] = [
  openaiProvider,
  deepseekProvider,
];

// Get an AI provider by its value
export function getAIProvider(providerValue: string): AIProviderStrategy {
  const provider = aiProviders.find((p) => p.value === providerValue);
  if (!provider) {
    throw new Error(`AI provider '${providerValue}' not found`);
  }
  return provider;
}

// Convert AI providers to choices for the select component
export const aiProviderChoices: Choice<string>[] = aiProviders.map((provider) => ({
  name: provider.name,
  value: provider.value,
  description: provider.description,
}));
