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

  // Define directories to check for templates
  const templateDirs: string[] = [];

  // 1. Check for templates in the current working directory
  templateDirs.push(path.join(appRoot, "templates"));

  // 2. Check for templates in the user's home directory
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  if (homeDir) {
    templateDirs.push(path.join(homeDir, ".pullai", "templates"));
  }

  // 3. Check for templates in the global npm directory
  const npmGlobalDir = process.env.npm_config_prefix;
  if (npmGlobalDir) {
    templateDirs.push(path.join(npmGlobalDir, "lib", "node_modules", "pullai", "templates"));
  }

  // Load templates from all directories
  let allTemplates: Template[] = [];

  // First load built-in templates
  for (const dir of templateDirs) {
    const templates = await loadTemplatesFromDir(dir, builtInDescriptions);

    // Add templates, giving precedence to already loaded ones
    for (const template of templates) {
      const existingIndex = allTemplates.findIndex(t => t.value === template.value);
      if (existingIndex >= 0) {
        // Skip this template as we already have one with the same name
        continue;
      } else {
        allTemplates.push(template);
      }
    }
  }

  // Create the user's template directory if it doesn't exist
  if (homeDir) {
    const userTemplateDir = path.join(homeDir, ".pullai", "templates");
    try {
      if (!fs.existsSync(path.join(homeDir, ".pullai"))) {
        fs.mkdirSync(path.join(homeDir, ".pullai"));
      }
      if (!fs.existsSync(userTemplateDir)) {
        fs.mkdirSync(userTemplateDir);

        // Copy default templates to user directory
        const defaultTemplatesDir = path.join(appRoot, "templates");
        if (fs.existsSync(defaultTemplatesDir)) {
          const templateFiles = fs.readdirSync(defaultTemplatesDir).filter(file => file.endsWith(".md"));
          for (const file of templateFiles) {
            const content = fs.readFileSync(path.join(defaultTemplatesDir, file), "utf-8");
            fs.writeFileSync(path.join(userTemplateDir, file), content);
          }
          console.log(`✅ Default templates copied to ${userTemplateDir}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error creating user template directory: ${error}`);
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
