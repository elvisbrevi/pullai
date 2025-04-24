import OpenAI from "openai";
import { AIProviderStrategy } from "./base-provider";
import type { TemplateFunction } from "./base-provider";

export class DeepseekProvider extends AIProviderStrategy {
  constructor() {
    super("Deepseek", "deepseek", "Use Deepseek's AI models");
  }

  async formatContentWithAI(
    rawDiff: string,
    language: string,
    templateFn: TemplateFunction
  ): Promise<string> {
    console.log(
      `🤖 Formatting content with Deepseek in ${
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
      model: "deepseek-reasoner", // Using Deepseek's model
    });

    return completion.choices[0].message.content
      ? completion.choices[0].message.content
      : "";
  }
}
