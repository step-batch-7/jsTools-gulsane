const {validateOptionAndField} = require('./validationLib');

const canBeOption = function (arg) {
  const optionLength = 2;
  if (!arg) {
    return false;
  }
  return arg.startsWith('-') && arg.length >= optionLength;
};

const updateOption = function (defaultArgs, argument) {
  defaultArgs.lastOption = argument;
  return defaultArgs;
};

const updateField = function (defaultArgs, argument) {
  const option = defaultArgs.lastOption;
  defaultArgs.options.push({option, field: argument});
  defaultArgs.lastOption = undefined;
  return defaultArgs;
};

const separator = function (defaultArgs, argument) {
  if (defaultArgs.lastOption) {
    return updateField(defaultArgs, argument);
  }
  if (canBeOption(argument)) {
    return updateOption(defaultArgs, argument);
  }
  defaultArgs.files.push(argument);
  return defaultArgs;
};

const separateOptionsAndFiles = function (userArgs) {
  const defaultArgs = {options: [], files: []};
  const {options, files} = userArgs.reduce(separator, defaultArgs);
  return {options, files};
};

const spotOptionError = function (options) {
  let error;
  options.every(option => {
    const errorStatement = validateOptionAndField(option);
    error = errorStatement.error;
    return errorStatement.validity;
  });
  return error;
};

const parseUserArguments = function (userArgs) {
  const {options, files} = separateOptionsAndFiles(userArgs);
  const optionError = spotOptionError(options);

  return {options, files, optionError};
};

module.exports = {separateOptionsAndFiles, canBeOption, parseUserArguments};
