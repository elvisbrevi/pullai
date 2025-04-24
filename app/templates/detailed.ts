export function getDetailedTemplate(rawDiff: string, language: string): string {
  return `Create a comprehensive and detailed pull request description in ${
    language === "en" ? "English" : "Spanish"
  } based on the provided raw Git diff. The description should be in **Markdown format** but **must not be wrapped in code blocks**.

The description should include the following detailed sections:

- **Executive Summary**: A high-level overview of the changes made and their purpose.
- **Technical Background**: Provide context about the technical area being modified.
- **Implementation Details**: A detailed explanation of how the changes were implemented.
- **Added Files**: A list of newly added files with a brief description of each file's purpose.
- **Modified Files**: A list of modified files with details about what was changed in each file.
- **Deleted Files**: A list of deleted files with explanation of why they were removed.
- **Testing Performed**: Description of how these changes were tested.
- **Potential Risks**: Any potential risks or side effects of these changes.
- **Future Improvements**: Suggestions for future improvements related to these changes.

🚨 **Important**:
- Be thorough and detailed in your analysis.
- Include technical details that would be helpful for code reviewers.
- Explain not just what was changed, but why it was changed.
- For complex changes, include code snippets or examples where appropriate.
- The content must be written in ${language === "en" ? "English" : "Spanish"}.

Here is the raw Git diff:

${rawDiff}`;
}
