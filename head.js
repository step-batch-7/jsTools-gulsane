const { parseUserArgs } = require("./src/parseUserArgs");
const { extractContent } = require("./src/loadContent");
const fs = require("fs");

const fileSys = { reader: fs.readFileSync, exists: fs.existsSync };

const main = function(userArgs) {
  const parsedArgs = parseUserArgs(userArgs);
  const content = extractContent(parsedArgs, fileSys);
  if (content.length == 0) return;
  console.log(content);
};
main(process.argv.slice(2));
