export type AIProvider = {
  name: string;
  value: string;
  description: string;
  formatContentWithAI: (rawDiff: string, language: string) => Promise<string>;
};
