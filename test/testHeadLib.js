const assert = require("chai").assert;
const { getFirstTenLines, loadFileContent } = require("../src/headLib");

describe("loadFileContent", () => {
  it("should return the content of the file when file is valid", () => {
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return "hello";
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return true;
      }
    };
    const actual = loadFileContent("file.txt", fileSys);
    assert.strictEqual(actual, "hello");
  });
  it("should return an error msg when file is invalid", () => {
    const fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "file.txt");
        return "hello";
      },
      exists: function(path) {
        assert.strictEqual(path, "file.txt");
        return false;
      }
    };
    const actual = loadFileContent("file.txt", fileSys);
    const errorMsg = "head: file.txt: no such file or directory";
    assert.strictEqual(actual.message, errorMsg);
  });
});

describe("getFirstTenLines", () => {
  it("should return 10 lines if file contains more than 10 lines", () => {
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
    const actual = getFirstTenLines(["file.txt"], fileSys);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should return the existing lines if file contains less than 10 lines", () => {
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
    const actual = getFirstTenLines(["file.txt"], fileSys);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should return the existing lines if file contains less than 10 lines", () => {
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
    const actual = getFirstTenLines(["file.txt"], fileSys);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should return nothing if file is empty", () => {
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
    const actual = getFirstTenLines(["file.txt"], fileSys);
    const expected = "";
    assert.strictEqual(actual, expected);
  });
  it("should return error message for invalid file", () => {
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
    const actual = getFirstTenLines(["file.txt"], fileSys);
    const expected = "head: file.txt: no such file or directory";
    assert.strictEqual(actual, expected);
  });
});
