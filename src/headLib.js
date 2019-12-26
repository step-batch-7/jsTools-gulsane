const loadFirstTenLines = function(err, data) {
  if (err) {
    const error = `head: ${this.filePath}: No such file or directory`;
    return this.showError(error);
  }
  const firstTenLines = data.split("\n").slice(0, 10);
  return this.showLines(firstTenLines.join("\n"));
};

const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  const bundleForLineLoad = { ...displayOutput, filePath };
  displayOutput.filePath = filePath;
  fileSys.readFile(filePath, "utf8", loadFirstTenLines.bind(bundleForLineLoad));
};

module.exports = { getFirstTenLines, loadFirstTenLines };
