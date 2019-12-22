const assert = require("chai").assert;
const { loadFileContent, giveFirstNLines } = require("../src/loadContent");

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

describe("giveFirstNLines", () => {
  it("should return given number of lines if lines are more in file", () => {
    const content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n");
    const actual = giveFirstNLines(content, 10);
    const expected = "1,2,3,4,5,6,7,8,9,10".split(",");
    assert.deepStrictEqual(actual, expected);
  });
  it("should return existing lines if less than the given number", () => {
    const content = [1, 2, 3, 4, 5].join("\n");
    const actual = giveFirstNLines(content, 10);
    const expected = "1,2,3,4,5".split(",");
    assert.deepStrictEqual(actual, expected);
  });
});
