/**
 * Type definition for template functions used by AI providers
 * A template function takes a raw diff and language code and returns a formatted prompt
 */
export type TemplateFunction = (rawDiff: string, language: string) => string;

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
