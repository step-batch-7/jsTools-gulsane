const fs = require("fs");

const loadFileContent = function(filePath, fileSys) {
  if (fileSys.exists(filePath)) {
    return fileSys.reader(filePath, "utf8");
  }
  const errorMsg = `head: ${filePath}: no such file or directory`;
  return new Error(errorMsg);
};

const getFirstTenLines = function(userArgs, fileSys) {
  const filePath = userArgs[0];
  const fileContent = loadFileContent(filePath, fileSys);
  if (fileContent instanceof Error) return fileContent.message;
  const firstTenLines = fileContent.split("\n").slice(0, 10);
  return firstTenLines.join("\n");
};

module.exports = { getFirstTenLines, loadFileContent };
