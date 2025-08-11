import OpenAI from "openai";
import { AIProviderStrategy } from "./base-provider";
import type { TemplateFunction } from "./base-provider";
import type { ModelConfig } from "./models";
import { availableModels } from "./models";

export class OpenAIProvider extends AIProviderStrategy {
  constructor() {
    super("OpenAI", "openai", "Use OpenAI's GPT models");
  }

  getDefaultModel(): ModelConfig {
    return availableModels.openai[0]; // GPT-5
  }

  async formatContentWithAI(
    rawDiff: string,
    language: string,
    templateFn: TemplateFunction,
    model?: ModelConfig
  ): Promise<string> {
    const selectedModel = model || this.getDefaultModel();
    
    console.log(
      `🤖 Formatting content with OpenAI ${selectedModel.name} in ${
        language === "en" ? "English" : "Spanish"
      }`
    );

    // Check if OPENAI_API_KEY is set
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY environment variable is not set. Please set it before using the OpenAI provider."
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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
