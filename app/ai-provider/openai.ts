import OpenAI from "openai";

async function formatContentWithAI(rawDiff: string, language: string) {
  console.log(
    `🤖 Formatting content with OpenAI in ${
      language === "en" ? "English" : "Spanish"
    }`
  );
  const openai = new OpenAI();

  const prompt = getPrompt(rawDiff, language);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4",
  });

  return completion.choices[0].message.content
    ? completion.choices[0].message.content
    : "";
}

function getPrompt(rawDiff: string, language: string) {
  let languagePrompt = language === "en" ? "English" : "Spanish";
  
  return `Create a pull request description in ${languagePrompt} based on the provided raw Git diff. The description should be in **Markdown format** but **must not be wrapped in code blocks** (e.g., \`\`\`markdown, \`\`\`).  

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
- The content and titles must be written in ${languagePrompt}.

Here is the raw Git diff:  

${rawDiff}`;
}

export default formatContentWithAI;
