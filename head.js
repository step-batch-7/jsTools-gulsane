const fs = require("fs");
const { getFirstTenLines } = require("./src/headLib");

const displayOutput = {
  showError: error => process.stderr.write(error),
  showLines: lines => process.stdout.write(lines)
};

const main = function(userArgs) {
  getFirstTenLines(userArgs, displayOutput, fs);
};
main(process.argv.slice(2));