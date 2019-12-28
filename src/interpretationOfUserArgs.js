const canBeOption = function(arg) {
  if (!arg) return false;
  return arg[0] == "-" && arg.length > 1;
};

const separateOptionsAndFiles = function(userArgs) {
  const options = [];
  let i = 0;
  while (canBeOption(userArgs[i])) {
    const option = userArgs[i].slice(0, 2);
    let field = "";
    if (userArgs[i].substring(2)) {
      field = userArgs[i].substring(2);
      i = i + 1;
    } else {
      field = userArgs[i + 1];
      i = i + 2;
    }
    options.push({ option, field });
  }
  const files = userArgs.slice(i, userArgs.length);
  return { options, files };
};

module.exports = { separateOptionsAndFiles, canBeOption };
