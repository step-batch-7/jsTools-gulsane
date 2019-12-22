const assert = require("chai").assert;
const {
  loadFileContent,
  giveFirstNLines,
  extractContent
} = require("../src/loadContent");

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

describe("extractContent", () => {
  it("should return given number of lines if lines are more in file", () => {
    const fileSys = {
      exists: function(path) {
        assert.strictEqual(path, "one.txt");
        return true;
      },
      reader: function(path) {
        assert.strictEqual(path, "one.txt");
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join("\n");
      }
    };
    const parseArgs = { noOfLines: 10, filePaths: ["one.txt"] };
    const actual = extractContent(parseArgs, fileSys);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should return the existing lines of file if they are less than the number", () => {
    const fileSys = {
      exists: function(path) {
        assert.strictEqual(path, "one.txt");
        return true;
      },
      reader: function(path) {
        assert.strictEqual(path, "one.txt");
        return [1, 2, 3, 4, 5, 6, 7].join("\n");
      }
    };
    const parseArgs = { noOfLines: 10, filePaths: ["one.txt"] };
    const actual = extractContent(parseArgs, fileSys);
    const expected = [1, 2, 3, 4, 5, 6, 7].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should return the error message if the file is not exists", () => {
    const fileSys = {
      exists: function(path) {
        assert.strictEqual(path, "one.txt");
        return false;
      },
      reader: function(path) {
        assert.strictEqual(path, "one.txt");
        return [1, 2, 3, 4, 5, 6, 7].join("\n");
      }
    };
    const parseArgs = { noOfLines: 10, filePaths: ["one.txt"] };
    const actual = extractContent(parseArgs, fileSys);
    const expected = "head: one.txt: no such file or directory";
    assert.strictEqual(actual, expected);
  });
});
