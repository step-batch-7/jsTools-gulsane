const loadFileContent = function(filePath, fileSys) {
  if (fileSys.exists(filePath)) {
    return fileSys.reader(filePath, "utf8");
  }
  const errorMsg = `head: ${filePath}: no such file or directory`;
  return new Error(errorMsg);
};

const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  const fileContent = loadFileContent(filePath, fileSys);
  if (fileContent instanceof Error) return displayOutput(fileContent);
  const firstTenLines = fileContent
    .split("\n")
    .slice(0, 10)
    .join("\n");
  return displayOutput({ firstTenLines });
};

module.exports = { getFirstTenLines, loadFileContent };
