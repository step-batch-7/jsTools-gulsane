const validateLineNumber = function (noOfLines) {
  const minimumLimit = 0;
  return (
    noOfLines > minimumLimit && Number.isInteger(+noOfLines)
    && !noOfLines.includes('.')
  );
};

const validateOption = function (option) {
  const availableOptions = ['-n'];
  return availableOptions.includes(option);
};

const validateOptionAndField = function (optionAndField) {
  const {option, field} = optionAndField;
  if (!validateOption(option)) {
    const usage = '\nusage: head [-n lines | -c bytes] [file ...]';
    const error =
      `head: illegal option -- ${option.split('').pop()}${usage}`;
    return {error, validity: false};
  }
  if (!validateLineNumber(field)) {
    const error = `head: illegal line count -- ${field}`;
    return {error, validity: false};
  }
  return {error: undefined, validity: true};
};

module.exports = {validateLineNumber, validateOptionAndField};
