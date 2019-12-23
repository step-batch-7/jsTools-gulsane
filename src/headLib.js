const loadFileContent = function(filePath, reader) {
  return reader(filePath, "utf8");
};

const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  const { reader, exists } = fileSys;
  if (!exists(filePath)) {
    const error = { errorMsg: `head: ${filePath}: no such file or directory` };
    return displayOutput(error);
  }
  const fileContent = loadFileContent(filePath, reader);
  const firstTenLines = fileContent
    .split("\n")
    .slice(0, 10)
    .join("\n");
  return displayOutput({ firstTenLines });
};

module.exports = { getFirstTenLines, loadFileContent };
