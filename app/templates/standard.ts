export function getStandardTemplate(rawDiff: string, language: string): string {
  return `Create a pull request description in ${
    language === "en" ? "English" : "Spanish"
  } based on the provided raw Git diff. The description should be in **Markdown format** but **must not be wrapped in code blocks** (e.g., \`\`\`markdown, \`\`\`).  

The description should include the following sections structure:  

- **Description**: A high-level summary of the changes made. This section **must include a clear and detailed explanation of the modifications, improvements, or new functionalities introduced**. The overall summary should be **integrated into this section, not placed separately at the end**.  
- **Added Files**: A list of newly added files.  
- **Modified Files**: A list of modified files.  
- **Deleted Files**: A list of deleted files.  
- **Change Details**: A breakdown of the changes made to each added or modified file. **Ensure that changes affecting business logic, API integrations (e.g., SOAP to REST migrations), and system architecture are explicitly mentioned and analyzed in depth.**  

🚨 **Important**:  
- Do **not** add an additional summary at the end of the document.  
- Ensure that all relevant changes, including API modifications, business logic updates, and architectural improvements, are properly identified and described.
- If a major refactor is detected, explain how it improves performance, maintainability, or security.
- Titles must have the special markdown format (e.g., # Title).
- The content must be written in ${language === "en" ? "English" : "Spanish"}.

Here is the raw Git diff:  

${rawDiff}`;
}
