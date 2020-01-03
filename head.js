const fs = require('fs');
const {head} = require('./src/pseudoMain');

const displayOutput = {
  showError: error => process.stderr.write(error),
  showLines: lines => process.stdout.write(lines)
};

const main = function (cmdLineArgument) {
  const [, , userArgs] = cmdLineArgument;
  head(userArgs, fs, displayOutput);
};
main(process.argv);
