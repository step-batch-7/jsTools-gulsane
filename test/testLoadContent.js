const assert = require("chai").assert;
const { loadFileContent } = require("../src/loadContent");

describe("loadFileContent", () => {
  it("should load the content of the file if it exists", () => {
    const fileSys = {
      exists: function(path) {
        assert.strictEqual(path, "one.txt");
        return true;
      },
      reader: function(path) {
        assert.strictEqual(path, "one.txt");
        return "welcome";
      }
    };
    const actual = loadFileContent("one.txt", fileSys);
    assert.strictEqual(actual, "welcome");
  });
  it("should return the error message if file is not exists", () => {
    const fileSys = {
      exists: function(path) {
        assert.strictEqual(path, "one.txt");
        return false;
      },
      reader: function(path) {
        assert.strictEqual(path, "one.txt");
        return "welcome";
      }
    };
    const actual = loadFileContent("one.txt", fileSys);
    const expected = "head: one.txt: no such file or directory";
    assert.strictEqual(actual, expected);
  });
});
