import simpleGit from "simple-git";
const currentDir = `${process.cwd()}/`;
const git = simpleGit(currentDir);

const ignoredFiles = [
  "node_modules",
  ".idea/",
  ".lock",
  ".env",
  ".npmrc",
  ".gitignore",
  "package-lock.json",
];

async function getSummary(targetBranch: string, originBranch: string) {
  console.log("🔍 Getting summary of differences");
  const files: string[] = [];
  const diff = await git.diffSummary([
    `${targetBranch}..${originBranch}`,
    "--",
    currentDir,
  ]);

  diff.files.forEach((file) => {
    if (!ignoredFiles.some((ignored) => file.file.includes(ignored))) {
      files.push(file.file);
    }
  });

  return files;
}

async function getDiff(
  targetBranch: string,
  originBranch: string,
  file: string
) {
  try {
    return await git.diff([
      `${targetBranch}..${originBranch}`,
      "--",
      currentDir + file,
    ]);
  } catch (err) {
    console.error("Error getting differences:", err);
    return "";
  }
}

export { getSummary, getDiff, git };
