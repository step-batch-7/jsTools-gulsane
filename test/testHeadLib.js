const assert = require("chai").assert;
const { getFirstTenLines, loadFirstTenLines } = require("../src/headLib");

describe("loadFirstTenLines", () => {
  const filePath = "file.txt";
  it("should return the file content when there is no error", () => {
    const expected = [1, 2, 3, 4, 5].join("\n");
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, showLines, filePath };
    const data = [1, 2, 3, 4, 5].join("\n");
    loadFirstTenLines.bind(bundleForLoadLine)(null, data);
  });
  it("should return error if file not exists", () => {
    const expected = "head: file.txt: No such file or directory";
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, showLines, filePath };
    const error = { code: "ENOENT" };
    loadFirstTenLines.bind(bundleForLoadLine)(error, undefined);
  });
  it("should return error while invoking a directory", () => {
    const expected = "head: Error reading file.txt";
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, showLines, filePath };
    const error = { code: "EISDIR" };
    loadFirstTenLines.bind(bundleForLoadLine)(error, undefined);
  });
  it("should return the error when file is larger than buffer size", () => {
    const expected = "head: Error reading file.txt";
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, showLines, filePath };
    const error = { code: "ERR_FS_FILE_TOO_LARGE" };
    loadFirstTenLines.bind(bundleForLoadLine)(error, undefined);
  });
});

describe("getFirstTenLines", () => {
  it("should return 10 lines if file contains more than 10 lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path) {
        assert.strictEqual(path, "file.txt");
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join("\n");
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return the existing lines if file contains less than 10 lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path) {
        assert.strictEqual(path, "file.txt");
        return [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return nothing if file is empty", () => {
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path) {
        assert.strictEqual(path, "file.txt");
        return "";
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return error message for invalid file", () => {
    const expected = "head: file.txt: No such file or directory";
    const displayOutput = {
      showError: error => assert.deepStrictEqual(error, expected)
    };
    const fileSys = {
      readFile: function(path) {
        assert.strictEqual(path, "file.txt");
        return "";
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
});
