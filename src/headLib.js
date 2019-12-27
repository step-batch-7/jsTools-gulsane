const validateLineNumber = function(noOfLines) {
  return (
    noOfLines > 0 && Number.isInteger(+noOfLines) && !noOfLines.includes(".")
  );
};

const loadFirstTenLines = function(err, data) {
  if (err) {
    const fileError = `head: ${this.filePath}: No such file or directory`;
    const readingError = `head: Error reading ${this.filePath}`;
    const error = err.code == "ENOENT" ? fileError : readingError;
    return this.showError(error);
  }
  const firstTenLines = data.split("\n").slice(0, 10);
  return this.showLines(firstTenLines.join("\n"));
};

const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  const bundleForLineLoad = { ...displayOutput, filePath };
  fileSys.readFile(filePath, "utf8", loadFirstTenLines.bind(bundleForLineLoad));
};

module.exports = { getFirstTenLines, loadFirstTenLines, validateLineNumber };
