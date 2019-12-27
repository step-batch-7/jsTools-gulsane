const loadFirstNLines = function(err, data) {
  if (err) {
    const fileError = `head: ${this.filePath}: No such file or directory`;
    const readingError = `head: Error reading ${this.filePath}`;
    const error = err.code == "ENOENT" ? fileError : readingError;
    return this.showError(error);
  }
  const firstNLines = data
    .split("\n")
    .slice(0, this.numberOfLines)
    .join("\n");
  return this.showLines(firstNLines);
};

const getFirstNLines = function(
  files,
  fileSys,
  displayOutput,
  numberOfLines = 10
) {
  const filePath = files[0];
  const bundleForLineLoad = { ...displayOutput, filePath, numberOfLines };
  fileSys.readFile(filePath, "utf8", loadFirstNLines.bind(bundleForLineLoad));
};

module.exports = { getFirstNLines, loadFirstNLines };
