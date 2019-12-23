const assert = require("chai").assert;
const { getFirstTenLines, loadFileContent } = require("../src/headLib");

describe("loadFileContent", () => {
  it("should return the content of the file when file is valid", () => {
    const reader = function(path) {
      assert.strictEqual(path, "file.txt");
      return "hello";
    };
    const actual = loadFileContent("file.txt", reader);
    assert.strictEqual(actual, "hello");
  });
});

describe("getFirstTenLines", () => {
  it("should return 10 lines if file contains more than 10 lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    const displayOutput = function(output) {
      assert.deepStrictEqual(output, { firstTenLines: expected });
    };
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join("\n");
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return the existing lines if file contains less than 10 lines", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
    const displayOutput = function(output) {
      assert.deepStrictEqual(output, { firstTenLines: expected });
    };
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return nothing if file is empty", () => {
    const displayOutput = function(output) {
      assert.deepStrictEqual(output, { firstTenLines: "" });
    };
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return "";
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
  it("should return error message for invalid file", () => {
    const expected = "head: file.txt: no such file or directory";
    const displayOutput = function(output) {
      assert.deepStrictEqual(output.errorMsg, expected);
    };
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return "";
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return false;
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
});
