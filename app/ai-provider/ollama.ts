import ollama from "ollama";

async function formatContentWithAI(rawDiff: string, language: string) {
    let languagePrompt = language === "en" ? "English" : "Spanish";
  console.log(
    `🤖 Formatting content with Ollama in ${languagePrompt}`
  );

  const prompt = getPrompt(rawDiff, languagePrompt);

  const response = await ollama.chat({
    model: "gemma3:4b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.message.content ? response.message.content : "";
}

function getPrompt(rawDiff: string, language: string) {
  return `Create a pull request description in ${language} based on the provided raw Git diff. The description should be 
  in **Markdown format** but **must not be wrapped in code blocks** (e.g., \`\`\`markdown, \`\`\`). 
  The markdown document should include only the following structure sections in the mentioned order and language, not more:  

- **Description**: A high-level summary of the changes made. This section **must include a clear and detailed explanation of the modifications, improvements, or new functionalities introduced**. The overall summary should be **integrated into this section, not placed separately at the end**.  
- **Added Files**: A list of newly added files.  
- **Modified Files**: A list of modified files.  
- **Deleted Files**: A list of deleted files.  
- **Change Details**: A breakdown of the changes made to each added or modified file. **Ensure that changes affecting business logic, API integrations (e.g., SOAP to REST migrations), and system architecture are explicitly mentioned and analyzed in depth.**  

Important: 
- Just like the previous five sections, the **Change Details** section should be integrated into the overall summary and not placed separately at the end.
- Do **not** add an additional summary at the end and at begin of the document.  
- The markdown format should be consistent throughout the document.
- Ensure that all relevant changes, including API modifications, business logic updates, and architectural improvements, are properly identified and described.
- If a major refactor is detected, explain how it improves performance, maintainability, or security.
- Titles must have the special markdown format (e.g., # Title).
- The content and titles must be written in ${language}.

Here is the raw Git diff:  

${rawDiff}`;
}

export default formatContentWithAI;