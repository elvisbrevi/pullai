import OpenAI from "openai";
import { AIProviderStrategy } from "./base-provider";
import type { TemplateFunction } from "./base-provider";
import type { ModelConfig } from "./models";
import { availableModels } from "./models";

export class DeepseekProvider extends AIProviderStrategy {
  constructor() {
    super("Deepseek", "deepseek", "Use Deepseek's AI models");
  }

  getDefaultModel(): ModelConfig {
    return availableModels.deepseek[0]; // DeepSeek Reasoner
  }

  async formatContentWithAI(
    rawDiff: string,
    language: string,
    templateFn: TemplateFunction,
    model?: ModelConfig
  ): Promise<string> {
    const selectedModel = model || this.getDefaultModel();
    
    console.log(
      `🤖 Formatting content with Deepseek ${selectedModel.name} in ${
        language === "en" ? "English" : "Spanish"
      }`
    );

    // Check if DEEPSEEK_API_KEY is set
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error(
        "DEEPSEEK_API_KEY environment variable is not set. Please set it before using the Deepseek provider."
      );
    }

    // Initialize OpenAI client with Deepseek base URL
    const openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
    });

    const prompt = templateFn(rawDiff, language);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: selectedModel.id,
    });

    return completion.choices[0].message.content
      ? completion.choices[0].message.content
      : "";
  }
}
