import type { Choice } from "../types/choice";
import { getStandardTemplate } from "./standard";
import { getConciseTemplate } from "./concise";
import { getDetailedTemplate } from "./detailed";

export type TemplateFunction = (rawDiff: string, language: string) => string;

export interface Template {
  name: string;
  value: string;
  description: string;
  getTemplate: TemplateFunction;
}

export const templates: Template[] = [
  {
    name: "Standard",
    value: "standard",
    description: "Standard PR description with sections for added, modified, and deleted files",
    getTemplate: getStandardTemplate,
  },
  {
    name: "Concise",
    value: "concise",
    description: "Brief, focused PR description with minimal details",
    getTemplate: getConciseTemplate,
  },
  {
    name: "Detailed",
    value: "detailed",
    description: "Comprehensive PR description with extensive technical details",
    getTemplate: getDetailedTemplate,
  },
];

export function getTemplateByName(templateName: string): Template {
  const template = templates.find((t) => t.value === templateName);
  if (!template) {
    throw new Error(`Template '${templateName}' not found`);
  }
  return template;
}

export const templateChoices: Choice<string>[] = templates.map((template) => ({
  name: template.name,
  value: template.value,
  description: template.description,
}));
