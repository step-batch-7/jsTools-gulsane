const loadFirstNLines = function (err, data) {
  const firstLineIndex = 0;
  if (err) {
    const fileError = `head: ${this.filePath}: No such file or directory`;
    const readingError = `head: Error reading ${this.filePath}`;
    const error = err.code === 'ENOENT' ? fileError : readingError;
    return this.showError(error);
  }
  const firstNLines = data
    .split('\n')
    .slice(firstLineIndex, this.numberOfLines)
    .join('\n');
  return this.showLines(firstNLines);
};

const getFirstNLines = function (parsedUserArgument, fileSys, displayOutput) {
  const {files, numberOfLines} = parsedUserArgument;
  files.forEach((filePath) => {
    const bundleForLineLoad = {...displayOutput, filePath, numberOfLines};
    fileSys.readFile(filePath, 'utf8', loadFirstNLines.bind(bundleForLineLoad));
  });
};

module.exports = {getFirstNLines, loadFirstNLines};
