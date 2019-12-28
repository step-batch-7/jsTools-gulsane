const assert = require("chai").assert;
const {
  separateOptionsAndFiles,
  canBeOption
} = require("../src/interpretationOfUserArgs");

describe("canBeOption", () => {
  it('should validate the option if it includes "-" and length >= 2', () => {
    const actual = canBeOption("-n");
    assert.isOk(actual);
  });
  it('should validate the option if it includes "-" and length >= 2', () => {
    const actual = canBeOption("-");
    assert.isNotOk(actual);
  });
  it('should invalidate the option which not includes "-"', () => {
    const actual = canBeOption("n");
    assert.isNotOk(actual);
  });
  it('should invalidate the option which has "-" not in the begin', () => {
    const actual = canBeOption("hello-hai");
    assert.isNotOk(actual);
  });
});

describe("separateOptionsAndFiles", () => {
  it("should return file name when only file name is given", () => {
    const actual = separateOptionsAndFiles(["file.txt"]);
    const expected = { options: [], files: ["file.txt"] };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return option when only option is given", () => {
    const actual = separateOptionsAndFiles(["-n", "6"]);
    const expected = {
      options: [{ option: "-n", field: "6" }],
      files: []
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return the options first possible options", () => {
    const actual = separateOptionsAndFiles(["-n", "6", "-h", "9", "file"]);
    const expected = {
      options: [
        { option: "-n", field: "6" },
        { option: "-h", field: "9" }
      ],
      files: ["file"]
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should consider the multiple file if it given after options", () => {
    const actual = separateOptionsAndFiles([
      "-n",
      "6",
      "-h",
      "9",
      "file1",
      "file2"
    ]);
    const expected = {
      options: [
        { option: "-n", field: "6" },
        { option: "-h", field: "9" }
      ],
      files: ["file1", "file2"]
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should consider the options as file when given after file", () => {
    const actual = separateOptionsAndFiles(["-n", "6", "file", "-n", "6"]);
    const expected = {
      options: [{ option: "-n", field: "6" }],
      files: ["file", "-n", "6"]
    };
    assert.deepStrictEqual(actual, expected);
  });
});
