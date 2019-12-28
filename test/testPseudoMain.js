const assert = require("chai").assert;
const { head } = require("../src/pseudoMain");

describe("head", () => {
  it("should return the error if option is not valid ", () => {
    const displayOutput = {
      showError: error => assert.strictEqual(error, expected),
      showLines: lines => assert.strictEqual(lines, expected)
    };
    const fileSys = { fileReader: path => {} };
    const expected =
      "head: illegal option -- k\nusage: head [-n lines | -c bytes] [file ...]";
    head(["-k"], fileSys, displayOutput);
  });
  it("should return the error if line count is not valid ", () => {
    const displayOutput = {
      showError: error => assert.strictEqual(error, expected),
      showLines: lines => assert.strictEqual(lines, expected)
    };
    const fileSys = { fileReader: path => {} };
    const expected = "head: illegal line count -- 2.4";
    head(["-n", "2.4"], fileSys, displayOutput);
  });
  it("should return the error if file is missing", () => {
    const displayOutput = {
      showError: error => assert.strictEqual(error, expected),
      showLines: lines => assert.strictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack({ code: "ENOENT" }, undefined);
      }
    };
    const expected = "head: file.txt: No such file or directory";
    head(["-n", "2", "file.txt"], fileSys, displayOutput);
  });
  it("should return the no off lines if file is present", () => {
    const displayOutput = {
      showError: error => assert.strictEqual(error, expected),
      showLines: lines => assert.strictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5].join("\n"));
      }
    };
    const expected = [1, 2, 3, 4, 5].join("\n");
    head(["-n", "5", "file.txt"], fileSys, displayOutput);
  });
  it("should return the no off lines when option and field are joined", () => {
    const displayOutput = {
      showError: error => assert.strictEqual(error, expected),
      showLines: lines => assert.strictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function(path, encoding, callBack) {
        assert.strictEqual(path, "file.txt");
        assert.strictEqual(encoding, "utf8");
        callBack(null, [1, 2, 3, 4, 5].join("\n"));
      }
    };
    const expected = [1, 2, 3, 4, 5].join("\n");
    head(["-n5", "file.txt"], fileSys, displayOutput);
  });
});
