const {parseUserArguments} = require('./interpretationOfUserArgs');
const {getFirstNLines} = require('./headLib');

const head = function (userArgs, fileSys, displayOutput) {
  const {options, files, optionError} = parseUserArguments(userArgs);
  const firstOptionIndex = 0;
  let numberOfLines = 10;
  if (options.length > firstOptionIndex) {
    if (optionError) {
      return displayOutput.showError(optionError);
    }
    numberOfLines = options[firstOptionIndex].field;
  }
  const parsedUserArgument = {numberOfLines, files};
  getFirstNLines(parsedUserArgument, fileSys, displayOutput);
};

module.exports = {head};
