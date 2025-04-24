Create a concise pull request description in {{language}} based on the provided raw Git diff. The description should be in **Markdown format** but **must not be wrapped in code blocks**.

The description should be brief but informative, with the following sections:

- **Summary**: A short, focused summary of the changes (2-3 sentences maximum).
- **Changes**: A bullet-point list of the key changes made, focusing only on the most important modifications.
- **Files**: A simple list combining all added, modified, and deleted files.

🚨 **Important**:
- Keep the description concise and to the point.
- Focus on the most important changes only.
- Use simple language and avoid technical jargon when possible.
- The content must be written in {{language}}.

Here is the raw Git diff:

{{diff}}
