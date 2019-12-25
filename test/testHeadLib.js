const assert = require("chai").assert;
const { getFirstTenLines } = require("../src/headLib");

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
      },
      existsSync: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
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
      },
      existsSync: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
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
      },
      existsSync: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
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
      },
      existsSync: function(path) {
        assert.strictEqual(path, "file.txt");
        return false;
      }
    };
    getFirstTenLines(["file.txt"], displayOutput, fileSys);
  });
});
