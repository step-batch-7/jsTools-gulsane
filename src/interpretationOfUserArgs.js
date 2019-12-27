const canBeOption = function(arg) {
  if (!arg) return false;
  return arg[0] == "-" && arg.length > 1;
};

const separateOptionsAndFiles = function(userArgs) {
  const options = [];
  let i = 0;
  while (canBeOption(userArgs[i])) {
    const option = userArgs[i].slice(0, 2);
    const field = userArgs[i + 1];
    options.push({ option, field });
    i = i + 2;
  }
  const files = userArgs.slice(i, userArgs.length);
  return { options, files };
};

module.exports = { separateOptionsAndFiles, canBeOption };
