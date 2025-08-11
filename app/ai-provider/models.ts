export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  inputTokenCost: number; // cost per 1M tokens
  outputTokenCost: number; // cost per 1M tokens
}

export interface ProviderModels {
  [providerId: string]: ModelConfig[];
}

export const availableModels: ProviderModels = {
  openai: [
    {
      id: "gpt-5",
      name: "GPT-5",
      description: "Latest state-of-the-art model with advanced reasoning capabilities",
      inputTokenCost: 1.25,
      outputTokenCost: 10.00,
    },
    {
      id: "gpt-5-mini",
      name: "GPT-5 Mini",
      description: "Efficient GPT-5 variant optimized for cost and performance balance",
      inputTokenCost: 0.25,
      outputTokenCost: 2.00,
    },
    {
      id: "gpt-5-nano",
      name: "GPT-5 Nano",
      description: "Ultra-efficient GPT-5 variant for high-volume, cost-sensitive applications",
      inputTokenCost: 0.05,
      outputTokenCost: 0.40,
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      description: "Multimodal model with excellent performance, faster than GPT-4 Turbo",
      inputTokenCost: 5.00,
      outputTokenCost: 15.00,
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      description: "Most cost-efficient small model, 60% cheaper than GPT-3.5 Turbo",
      inputTokenCost: 0.15,
      outputTokenCost: 0.60,
    },
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      description: "Previous generation high-intelligence model",
      inputTokenCost: 10.00,
      outputTokenCost: 30.00,
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      description: "Fast, inexpensive model for simple tasks",
      inputTokenCost: 0.50,
      outputTokenCost: 1.50,
    },
  ],
  deepseek: [
    {
      id: "deepseek-reasoner",
      name: "DeepSeek Reasoner",
      description: "Advanced reasoning model with step-by-step thinking",
      inputTokenCost: 0.55,
      outputTokenCost: 2.19,
    },
    {
      id: "deepseek-chat",
      name: "DeepSeek Chat",
      description: "General-purpose conversational model",
      inputTokenCost: 0.14,
      outputTokenCost: 0.28,
    },
  ],
};

export function getModelsForProvider(providerId: string): ModelConfig[] {
  return availableModels[providerId] || [];
}

export function getModelConfig(providerId: string, modelId: string): ModelConfig | undefined {
  const providerModels = getModelsForProvider(providerId);
  return providerModels.find(model => model.id === modelId);
}

export function estimateCost(inputTokens: number, outputTokens: number, model: ModelConfig): number {
  const inputCost = (inputTokens / 1_000_000) * model.inputTokenCost;
  const outputCost = (outputTokens / 1_000_000) * model.outputTokenCost;
  return inputCost + outputCost;
}

export function countTokensApprox(text: string): number {
  // Rough approximation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
}