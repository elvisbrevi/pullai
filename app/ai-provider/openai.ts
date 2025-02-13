import OpenAI from "openai";

async function formatContentWithAI(rawDiff: string) {
  console.log("🤖 Formateando contenido con OpenAI");
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Create a spanish pull request description based on the provided raw Git diff. The description should be in **Markdown format** but **must not be wrapped in code blocks** (e.g., \`\`\`markdown, \`\`\`).  
  
  The description should include th following sections structure, all of these titles in Spanish:  
  
  - **Descripción**: A high-level summary of the changes made. This section **must include a clear and detailed explanation of the modifications, improvements, or new functionalities introduced**. The overall summary should be **integrated into this section, not placed separately at the end**.  
  - **Added Files (in spanish)**: A list of newly added files.  
  - **Modified Files (in spanish)**: A list of modified files.  
  - **Deleted Files (in spanish)**: A list of deleted files.  
  - **Change Details (in spanish)**: A breakdown of the changes made to each added or modified file. **Ensure that changes affecting business logic, API integrations (e.g., SOAP to REST migrations), and system architecture are explicitly mentioned and analyzed in depth.**  
  
  🚨 **Important**:  
  - Do **not** add an additional summary at the end of the document.  
  - Ensure that all relevant changes, including API modifications, business logic updates, and architectural improvements, are properly identified and described.  
  - If a major refactor is detected, explain how it improves performance, maintainability, or security.
  - Tiiles must have the special markdown format (e.g., # Title).
  
  Here is the raw Git diff:  
  
  ${rawDiff}`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content
    ? completion.choices[0].message.content
    : "";
}

export default formatContentWithAI;
