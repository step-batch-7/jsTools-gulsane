const fs = require("fs");
const { getFirstNLines } = require("./src/headLib");

const displayOutput = {
  showError: error => process.stderr.write(error),
  showLines: lines => process.stdout.write(lines)
};

const main = function(userArgs) {
  getFirstNLines(userArgs, fs, displayOutput);
};
main(process.argv.slice(2));
