const { stdout, stderr } = require("process");
const fs = require("fs");
const { getFirstTenLines } = require("./src/headLib");
const fileSys = { exists: fs.existsSync, reader: fs.readFileSync };

const displayOutput = function(output) {
  output.errorMsg && stderr.write(output.errorMsg);
  output.firstTenLines && stdout.write(output.firstTenLines);
};
const main = function(userArgs) {
  getFirstTenLines(userArgs, displayOutput, fileSys);
};
main(process.argv.slice(2));
