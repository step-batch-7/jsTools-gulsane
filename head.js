const fs = require("fs");
const { getFirstTenLines } = require("./src/headLib");

const displayOutput = function(output) {
  output.errorMsg && process.stderr.write(output.errorMsg);
  output.firstTenLines && process.stdout.write(output.firstTenLines);
};

const main = function(userArgs) {
  getFirstTenLines(userArgs, displayOutput, fs);
};
main(process.argv.slice(2));
