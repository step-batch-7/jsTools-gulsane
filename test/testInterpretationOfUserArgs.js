const assert = require('chai').assert;
const {
  separateOptionsAndFiles,
  canBeOption, parseUserArguments
} = require('../src/interpretationOfUserArgs');

describe('canBeOption', () => {
  it('should validate the option if it includes "-" and length >= 2', () => {
    const actual = canBeOption('-n');
    assert.isOk(actual);
  });
  it('should validate the option if it includes "-" and length >= 2', () => {
    const actual = canBeOption('-');
    assert.isNotOk(actual);
  });
  it('should invalidate the option which not includes "-"', () => {
    const actual = canBeOption('n');
    assert.isNotOk(actual);
  });
  it('should invalidate the option which has "-" not in the begin', () => {
    const actual = canBeOption('hello-hai');
    assert.isNotOk(actual);
  });
  it('should return false when argument is undefined', () => {
    const actual = canBeOption();
    assert.isNotOk(actual);
  });
});

describe('separateOptionsAndFiles', () => {
  it('should return file name when only file name is given', () => {
    const actual = separateOptionsAndFiles(['file.txt']);
    const expected = {options: [], files: ['file.txt']};
    assert.deepStrictEqual(actual, expected);
  });
  it('should return option when only option is given', () => {
    const actual = separateOptionsAndFiles(['-n', '6']);
    const expected = {
      options: [{option: '-n', field: '6'}],
      files: []
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should return the options first possible options', () => {
    const actual = separateOptionsAndFiles(['-n', '6', '-h', '9', 'file']);
    const expected = {
      options: [
        {option: '-n', field: '6'},
        {option: '-h', field: '9'}
      ],
      files: ['file']
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should consider the multiple file if it given after options', () => {
    const actual = separateOptionsAndFiles([
      '-n',
      '6',
      '-h',
      '9',
      'file1',
      'file2'
    ]);
    const expected = {
      options: [
        {option: '-n', field: '6'},
        {option: '-h', field: '9'}
      ],
      files: ['file1', 'file2']
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should return empty arrays when no argument is given', () => {
    const actual = separateOptionsAndFiles([]);
    const expected = {options: [], files: []};
    assert.deepStrictEqual(actual, expected);
  });
});

describe('parseUserArguments', () => {
  describe('#invalid options', () => {
    it('should return option error along with options and files', () => {
      const actual = parseUserArguments(['-k', '3', 'file.txt']);
      const expected = {
        options: [{option: '-k', field: '3'}], files: ['file.txt'],
        optionError: 'head: illegal option -- k\nusage: head [-n lines | -c bytes] [file ...]'
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('should return field error along with options and files', () => {
      const actual = parseUserArguments(['-n', '3.5', 'file.txt']);
      const expected = {
        options: [{option: '-n', field: '3.5'}], files: ['file.txt'],
        optionError: 'head: illegal line count -- 3.5'
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('#valid options', () => {
    it('should return options and files ', () => {
      const actual = parseUserArguments(['-n', '3', 'file.txt']);
      const expected = {
        options: [{option: '-n', field: '3'}], files: ['file.txt'],
        optionError: undefined
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
