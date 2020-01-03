const assert = require('chai').assert;
const {
  validateLineNumber,
  validateOptionAndField
} = require('../src/validationLib');

describe('validateOptionAndField', () => {
  it('should return undefined when option and field are valid', () => {
    const actual = validateOptionAndField({option: '-n', field: '6'});
    const expected = {error: undefined, validity: true};
    assert.deepStrictEqual(actual, expected);
  });
  it('should return option error when only option is invalid', () => {
    const actual = validateOptionAndField({option: '-k', field: '6'});
    const usage = '\nusage: head [-n lines | -c bytes] [file ...]';
    const error = `head: illegal option -- k${usage}`;
    const expected = {error, validity: false};
    'head: illegal option -- k\nusage: head [-n lines | -c bytes] [file ...]';
    assert.deepStrictEqual(actual, expected);
  });
  it('should return field error when only field is invalid', () => {
    const actual = validateOptionAndField({option: '-n', field: '6.4'});
    const error = 'head: illegal line count -- 6.4';
    const expected = {error, validity: false};
    assert.deepStrictEqual(actual, expected);
  });
});

describe('validateLIneNumber', () => {
  it('should validate the positive non decimal floating number', () => {
    const actual = validateLineNumber('2');
    assert.isOk(actual);
  });
  it('should invalidate the negative number', () => {
    const actual = validateLineNumber('-2');
    assert.isNotOk(actual);
  });
  it('should invalidate the decimal floating number', () => {
    const actual = validateLineNumber('2.0');
    assert.isNotOk(actual);
  });
  it('should invalidate the non numerical value', () => {
    const actual = validateLineNumber('abc');
    assert.isNotOk(actual);
  });
  it('should invalidate the combination of number and alphabets', () => {
    assert.isNotOk(validateLineNumber('2abc'));
  });
  it('should invalidate the 0', () => {
    assert.isNotOk(validateLineNumber('0'));
  });
});
