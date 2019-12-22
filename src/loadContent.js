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

const extractContent = function(parsedArgs, fileSys) {
  const filePath = parsedArgs.filePaths[0];
  const { noOfLines } = parsedArgs;
  const fileText = loadFileContent(filePath, fileSys);
  const content = giveFirstNLines(fileText, noOfLines);
  return content.join("\n");
};

module.exports = { loadFileContent, giveFirstNLines, extractContent };
