const loadFirstTenLines = function(err, data) {
  if (err) {
    const fileError = `head: ${this.filePath}: No such file or directory`;
    const directoryError = `head: Error reading ${this.filePath}`;
    const bigFileError = directoryError;
    const errors = {
      ENOENT: fileError,
      EISDIR: directoryError,
      ERR_FS_FILE_TOO_LARGE: bigFileError
    };
    return this.showError(errors[err.code]);
  }
  const firstTenLines = data.split("\n").slice(0, 10);
  return this.showLines(firstTenLines.join("\n"));
};

const getFirstTenLines = function(userArgs, displayOutput, fileSys) {
  const filePath = userArgs[0];
  const bundleForLineLoad = { ...displayOutput, filePath };
  fileSys.readFile(filePath, "utf8", loadFirstTenLines.bind(bundleForLineLoad));
};

module.exports = { getFirstTenLines, loadFirstTenLines };
