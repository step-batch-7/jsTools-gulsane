const fs = require("fs");
const loadFileContent = function(filePath, fileSys) {
  if (fileSys.exists(filePath)) {
    return fileSys.reader(filePath, "utf8");
  }
  return `head: ${filePath}: no such file or directory`;
};

module.exports = { loadFileContent };
