const validateLineNumber = function(noOfLines) {
  return (
    noOfLines > 0 && Number.isInteger(+noOfLines) && !noOfLines.includes(".")
  );
};

const validateOption = function(option) {
  const availableOptions = ["-n"];
  return availableOptions.includes(option);
};

const validateOptionAndField = function(optionAndField) {
  const validOption = validateOption(optionAndField.option);
  const validField = validateLineNumber(optionAndField.field);
  if (!validOption) {
    const usage = "\nusage: head [-n lines | -c bytes] [file ...]";
    return `head: illegal option -- ${optionAndField.option.slice(-1)}${usage}`;
  }
  if (!validField) {
    return `head: illegal line count -- ${optionAndField.field}`;
  }
  return undefined;
};

module.exports = { validateLineNumber, validateOptionAndField };
