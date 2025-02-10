import simpleGit from "simple-git";
import fs from "node:fs";
import OpenAI from "openai";

const git = simpleGit(
  "/Users/elvisbrevi/Code/sag/sag.portalpagos.micsrv.obtenertoken.v1"
);

const branch1 = "master";
const branch2 = "feature/15256-portar-logica-biztalk";
const base_dir =
  "/Users/elvisbrevi/Code/sag/sag.portalpagos.micsrv.obtenertoken.v1/";

const ignoredFiles = [
  ".lock",
  ".env",
  ".npmrc",
  ".gitignore",
  "package-lock.json",
];

async function main() {
  const diffSummary = await getSummary(branch1, branch2, base_dir);
  let content = await getContent(diffSummary);
  content = await formatContentWithAI(content);
  contentToMarkdown(content);
}

async function contentToMarkdown(content) {
  fs.writeFile("pull_request.txt", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Archivo creado exitosamente");
    }
  });
}

async function formatContentWithAI(rawDiff) {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Create a spanish pull request description in markdown format based on a raw Git diff. 
The description should include the following sections:
- **Description**: A brief summary of the changes detected from the diff.
- **Added Files**: A list of files that have been added.
- **Modified Files**: A list of files that have been modified.
- **Deleted Files**: A list of files that have been deleted.
- **Change Details**: A list of modified and/or added files with a brief description of the changes made in each file. 
Use the provided raw diff below:

\`\`\`
${rawDiff}
\`\`\`
`,
      },
    ],
    model: "gpt-4o",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

async function getContent(files) {
  let content = "";
  for (const file of files) {
    content += await getDiff(branch1, branch2, file);
  }
  return content;
}

async function getSummary(branch1, branch2, base_dir) {
  const files = [];
  const diff = await git.diffSummary([
    `${branch1}..${branch2}`,
    "--",
    base_dir,
  ]);

  diff.files.forEach((file) => {
    if (!ignoredFiles.some((ignored) => file.file.includes(ignored))) {
      files.push(file.file);
    }
  });

  return files;
}

async function getDiff(branch1, branch2, file) {
  try {
    return await git.diff([`${branch1}..${branch2}`, "--", base_dir + file]);
  } catch (err) {
    console.error("Error al obtener las diferencias:", err);
    return "";
  }
}

main();
