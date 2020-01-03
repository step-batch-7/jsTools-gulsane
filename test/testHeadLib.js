const assert = require('chai').assert;
const {getFirstNLines, loadFirstNLines} = require('../src/headLib');

describe('loadFirstNLines', () => {
  const filePath = 'file.txt';
  it('should return n number of lines if present and there is no error', () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = {showLines, filePath, numberOfLines: 5};
    const data = '1 2 3 4 5'.split(' ').join('\n');
    const expected = '1 2 3 4 5'.split(' ').join('\n');
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it('should return n lines if present lines are more and no error', () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = {showLines, filePath, numberOfLines: 5};
    const data = '1 2 3 4 5 6 7 8 9 10'.split(' ').join('\n');
    const expected = '1 2 3 4 5'.split(' ').join('\n');
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it('should return existing lines if lines are less than asked', () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = {showLines, filePath, numberOfLines: 5};
    const data = '1 2 3'.split(' ').join('\n');
    const expected = '1 2 3'.split(' ').join('\n');
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it('should return empty string if there in no lines in data ', () => {
    const showLines = lines => assert.deepStrictEqual(lines, expected);
    const bundleForLoadLine = {showLines, filePath, numberOfLines: 5};
    const data = [''].join('\n');
    const expected = [''].join('\n');
    loadFirstNLines.bind(bundleForLoadLine)(null, data);
  });
  it('should return error if file not exists', () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = {showError, filePath, numberOfLines: 19};
    const error = {code: 'ENOENT'};
    const expected = 'head: file.txt: No such file or directory';
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
  it('should return error while invoking a directory', () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = {showError, filePath, numberOfLines: 19};
    const error = {code: 'EISDIR'};
    const expected = 'head: Error reading file.txt';
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
  it('should return the error when file is larger than buffer size', () => {
    const showError = error => assert.deepStrictEqual(error, expected);
    const bundleForLoadLine = {showError, filePath, numberOfLines: 19};
    const error = {code: 'ERR_FS_FILE_TOO_LARGE'};
    const expected = 'head: Error reading file.txt';
    loadFirstNLines.bind(bundleForLoadLine)(error, undefined);
  });
});

describe('getFirstNLines', () => {
  it('should return number of line when it is given', () => {
    const expected = '1 2 3 4 5 6 7 8 9 10'.split(' ').join('\n');
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function (path, encoding, callBack) {
        assert.strictEqual(path, 'file.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ').join('\n'));
      }
    };
    const parsedUserArgument = {files: ['file.txt'], numberOfLines: 10};
    getFirstNLines(parsedUserArgument, fileSys, displayOutput);
  });
  it('should return n lines if file contains more than n lines', () => {
    const expected = '1 2 3 4 5 6 7 8 9 10'.split(' ').join('\n');
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function (path, encoding, callBack) {
        assert.strictEqual(path, 'file.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ').join('\n'));
      }
    };
    const parsedUserArgument = {files: ['file.txt'], numberOfLines: 10};
    getFirstNLines(parsedUserArgument, fileSys, displayOutput);
  });
  it('should return the lines if file contains less than n lines', () => {
    const expected = '1 2 3 4 5 6 7'.split(' ').join('\n');
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, expected)
    };
    const fileSys = {
      readFile: function (path, encoding, callBack) {
        assert.strictEqual(path, 'file.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '1 2 3 4 5 6 7'.split(' ').join('\n'));
      }
    };
    const parsedUserArgument = {files: ['file.txt'], numberOfLines: 15};
    getFirstNLines(parsedUserArgument, fileSys, displayOutput);
  });

  it('should return empty string if file is empty', () => {
    const displayOutput = {
      showLines: lines => assert.deepStrictEqual(lines, '')
    };
    const fileSys = {
      readFile: function (path, encoding, callBack) {
        assert.strictEqual(path, 'file.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '');
      }
    };
    const parsedUserArgument = {files: ['file.txt'], numberOfLines: 10};
    getFirstNLines(parsedUserArgument, fileSys, displayOutput);
  });
  it('should return error message for invalid file', () => {
    const expected = 'head: file.txt: No such file or directory';
    const displayOutput = {
      showError: error => assert.deepStrictEqual(error, expected)
    };
    const fileSys = {
      readFile: function (path, encoding, callBack) {
        assert.strictEqual(path, 'file.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack({code: 'ENOENT'}, undefined);
      }
    };
    const parsedUserArgument = {files: ['file.txt'], numberOfLines: 10};
    getFirstNLines(parsedUserArgument, fileSys, displayOutput);
  });
});
