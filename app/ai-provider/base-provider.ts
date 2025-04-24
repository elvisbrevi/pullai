import type { TemplateFunction } from "../templates";

export abstract class AIProviderStrategy {
  constructor(
    public readonly name: string,
    public readonly value: string,
    public readonly description: string
  ) {}

  abstract formatContentWithAI(
    rawDiff: string,
    language: string,
    templateFn: TemplateFunction
  ): Promise<string>;
}
