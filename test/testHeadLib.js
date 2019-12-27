const assert = require("chai").assert;
const { getFirstNLines, loadFirstNLines } = require("../src/headLib");

describe("loadFirstNLines", () => {
  const filePath = "file.txt";
  it("should return the asked number of lines if present and there is no error", () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = { showLines, filePath, numberOfLines: 5 };
    const data = [1, 2, 3, 4, 5].join("\n");
    const expected = [1, 2, 3, 4, 5].join("\n");
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it("should return the asked number of lines if present lines area more and there is no error", () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = { showLines, filePath, numberOfLines: 5 };
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    const expected = [1, 2, 3, 4, 5].join("\n");
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it("should return existing lines if lines are less than asked and there is no error", () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = { showLines, filePath, numberOfLines: 5 };
    const data = [1, 2, 3].join("\n");
    const expected = [1, 2, 3].join("\n");
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it("should return empty string if there in no lines in data and there is no error", () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = { showLines, filePath, numberOfLines: 5 };
    const data = [""].join("\n");
    const expected = [""].join("\n");
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it("should return error if file not exists", () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, filePath, numberOfLines: 19 };
    const error = { code: "ENOENT" };
    const expected = "head: file.txt: No such file or directory";
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
  it("should return error while invoking a directory", () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, filePath, numberOfLines: 19 };
    const error = { code: "EISDIR" };
    const expected = "head: Error reading file.txt";
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
  it("should return the error when file is larger than buffer size", () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = { showError, filePath, numberOfLines: 19 };
    const error = { code: "ERR_FS_FILE_TOO_LARGE" };
    const expected = "head: Error reading file.txt";
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
});

describe("getFirstNLines", () => {
  it("should return at most 10 lines when number of line is not given", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join("\n"));
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput);
  });
  it("should return n lines if file contains more than n lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join("\n"));
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput, 10);
  });
  it("should return the existing lines if file contains less than n lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5, 6, 7].join("\n"));
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput, 15);
  });
  it("should return the n num of lines when n is given", () => {
    const expected = [1, 2, 3, 4, 5].join("\n");
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5, 6, 7].join("\n"));
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput, 5);
  });
  it("should return empty string if file is empty", () => {
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, "")
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, "");
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput, 13);
  });
  it("should return error message for invalid file", () => {
    const expected = "head: file.txt: No such file or directory";
    const displayOutput = {
      showError: error => assert.deepStrictEqual(error, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack({ code: "ENOENT" }, undefined);
      }
    };
    getFirstNLines(["file.txt"], fileSys, displayOutput, 9);
  });
});
