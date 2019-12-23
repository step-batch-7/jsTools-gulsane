const { stdout } = require("process");
const fs = require("fs");
const { getFirstTenLines } = require("./src/headLib");
const fileSys = { exists: fs.existsSync, reader: fs.readFileSync };

const main = function(userArgs) {
  const firstTenLines = getFirstTenLines(userArgs, fileSys);
  stdout.write(firstTenLines);
};
main(process.argv.slice(2));
