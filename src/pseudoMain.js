const {separateOptionsAndFiles} = require('./interpretationOfUserArgs');
const {validateOptionAndField} = require('./validationLib');
const {getFirstNLines} = require('./headLib');

const optionHandler = function (options) {
  let error;
  options.every(option => {
    const errorStatement = validateOptionAndField(option);
    error = errorStatement.error;
    return errorStatement.validity;
  });
  return error;
};

const head = function (userArgs, fileSys, displayOutput) {
  const {options, files} = separateOptionsAndFiles(userArgs);
  const firstOptionIndex = 0;
  let numberOfLines = 10;
  if (options.length > firstOptionIndex) {
    const optionError = optionHandler(options);
    if (optionError) {
      return displayOutput.showError(optionError);
    }
    numberOfLines = options[firstOptionIndex].field;
  }
  const parsedUserArgument = {numberOfLines, files};
  getFirstNLines(parsedUserArgument, fileSys, displayOutput);
};

module.exports = {head};
