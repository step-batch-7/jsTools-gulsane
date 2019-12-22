const loadFileContent = function(filePath, fileSys) {
  if (fileSys.exists(filePath)) {
    return fileSys.reader(filePath, "utf8");
  }
  return `head: ${filePath}: no such file or directory`;
};

const giveFirstNLines = function(content, noOfLines) {
  const totalLines = content.split("\n");
  return totalLines.slice(0, noOfLines);
};

module.exports = { loadFileContent, giveFirstNLines };
