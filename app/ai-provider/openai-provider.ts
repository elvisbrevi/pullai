import OpenAI from "openai";
import { AIProviderStrategy } from "./base-provider";
import type { TemplateFunction } from "./base-provider";

export class OpenAIProvider extends AIProviderStrategy {
  constructor() {
    super("OpenAI", "openai", "Use OpenAI's GPT models");
  }

  async formatContentWithAI(
    rawDiff: string,
    language: string,
    templateFn: TemplateFunction
  ): Promise<string> {
    console.log(
      `🤖 Formatting content with OpenAI in ${
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
      model: "gpt-4-turbo",
    });

    return completion.choices[0].message.content
      ? completion.choices[0].message.content
      : "";
  }
}
