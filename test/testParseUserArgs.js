const assert = require("chai").assert;
const { parseUserArgs } = require("../src/parseUserArgs");

describe("parseUserArgs", () => {
  it.only("should return the abject includes filePath and noOfLines", () => {
    const actual = parseUserArgs(["file.txt"]);
    const expected = { noOfLines: 10, filePaths: ["file.txt"] };
    assert.deepStrictEqual(actual, expected);
  });
});
