const parseUserArgs = function(userArgs) {
  const filePath = userArgs[0];
  const noOfLines = 10;
  const parsedArgs = { noOfLines, filePaths: [filePath] };
  return parsedArgs;
};

exports.parseUserArgs = parseUserArgs;
