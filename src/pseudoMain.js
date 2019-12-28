const { separateOptionsAndFiles } = require("./interpretationOfUserArgs");
const { validateOptionAndField } = require("./validationLib");
const { getFirstNLines } = require("./headLib");

const optionHandler = function(options) {
  let error;
  options.every(option => {
    error = validateOptionAndField(option);
  });
  return error;
};

const head = function(userArgs, fileSys, displayOutput) {
  const optionsAndFields = separateOptionsAndFiles(userArgs);
  const { options, files } = optionsAndFields;
  let numberOfLines = 10;
  if (options.length > 0) {
    const optionError = optionHandler(options);
    if (optionError) return displayOutput.showError(optionError);
    numberOfLines = options[options.length - 1].field;
  }
  getFirstNLines(files, fileSys, displayOutput, numberOfLines);
};

module.exports = { head };
