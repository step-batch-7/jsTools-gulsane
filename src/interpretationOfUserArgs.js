const canBeOption = function (arg) {
  const optionLength = 2;
  if (!arg) {
    return false;
  }
  return arg.startsWith('-') && arg.length >= optionLength;
};

const separator = function (defaultArgs, argument) {
  if (defaultArgs.lastOption) {
    const option = defaultArgs.lastOption;
    defaultArgs.options.push({option, field: argument});
    defaultArgs.lastOption = undefined;
    return defaultArgs;
  }
  if (canBeOption(argument)) {
    defaultArgs.lastOption = argument;
    return defaultArgs;
  }
  defaultArgs.files.push(argument);
  return defaultArgs;
};

const separateOptionsAndFiles = function (userArgs) {
  const defaultArgs = {options: [], files: []};
  const {options, files} = userArgs.reduce(separator, defaultArgs);
  return {options, files};
};

module.exports = {separateOptionsAndFiles, canBeOption};
