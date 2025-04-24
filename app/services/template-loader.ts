import fs from "fs";
import path from "path";
import type { Choice } from "../types/choice";

// Define the template interface
export interface Template {
  name: string;
  value: string;
  description: string;
  content: string;
}

// Function to get template content
export function getTemplateContent(
  rawDiff: string,
  language: string,
  templateContent: string
): string {
  // Replace placeholders in the template
  return templateContent
    .replace(/{{language}}/g, language === "en" ? "English" : "Spanish")
    .replace(/{{diff}}/g, rawDiff);
}

// Function to load templates from a directory
export async function loadTemplatesFromDir(
  dirPath: string,
  descriptions: Record<string, string> = {}
): Promise<Template[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    // Get all markdown files in the directory
    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".md"));
    
    // Load each template
    const templates: Template[] = [];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const fileName = path.basename(file, ".md");
      
      // Create a template object
      templates.push({
        name: fileName.charAt(0).toUpperCase() + fileName.slice(1), // Capitalize first letter
        value: fileName,
        description: descriptions[fileName] || `Custom template: ${fileName}`,
        content,
      });
    }
    
    return templates;
  } catch (error) {
    console.error(`Error loading templates from ${dirPath}:`, error);
    return [];
  }
}

// Function to load all templates (built-in and user-added)
export async function loadAllTemplates(): Promise<Template[]> {
  // Define built-in template descriptions
  const builtInDescriptions: Record<string, string> = {
    standard: "Standard PR description with sections for added, modified, and deleted files",
    concise: "Brief, focused PR description with minimal details",
    detailed: "Comprehensive PR description with extensive technical details",
  };
  
  // Get the application's root directory
  const appRoot = process.cwd();
  
  // Load built-in templates
  const builtInTemplatesDir = path.join(appRoot, "templates");
  const builtInTemplates = await loadTemplatesFromDir(builtInTemplatesDir, builtInDescriptions);
  
  // Load user templates from global installation directory if available
  let userTemplates: Template[] = [];
  
  // Check for npm global installation directory
  const npmGlobalDir = process.env.npm_config_prefix;
  if (npmGlobalDir) {
    const userTemplatesDir = path.join(npmGlobalDir, "templates");
    userTemplates = await loadTemplatesFromDir(userTemplatesDir);
  }
  
  // Combine templates, giving precedence to user templates
  const allTemplates = [...builtInTemplates];
  
  // Add user templates, overriding built-in ones with the same name
  for (const userTemplate of userTemplates) {
    const existingIndex = allTemplates.findIndex(t => t.value === userTemplate.value);
    if (existingIndex >= 0) {
      allTemplates[existingIndex] = userTemplate;
    } else {
      allTemplates.push(userTemplate);
    }
  }
  
  return allTemplates;
}

// Function to get a template by name
export async function getTemplateByName(templateName: string): Promise<Template> {
  const templates = await loadAllTemplates();
  const template = templates.find((t) => t.value === templateName);
  
  if (!template) {
    throw new Error(`Template '${templateName}' not found`);
  }
  
  return template;
}

// Function to get template choices for the select component
export async function getTemplateChoices(): Promise<Choice<string>[]> {
  const templates = await loadAllTemplates();
  
  return templates.map((template) => ({
    name: template.name,
    value: template.value,
    description: template.description,
  }));
}
