const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  if (!fileSys.existsSync(filePath)) {
    const error = `head: ${filePath}: No such file or directory`;
    return displayOutput.showError(error);
  }
  const loadFirstTenLines = function(data) {
    const firstTenLines = data
      .split("\n")
      .slice(0, 10)
      .join("\n");
    return displayOutput.showLines(firstTenLines);
  };
  fileSys.readFile(filePath, "utf8", (err, data) => {
    loadFirstTenLines(data);
  });
};

module.exports = { getFirstTenLines };
