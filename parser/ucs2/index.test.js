'use strict';

const expect = require('chai').expect;
const parseUcs2 = require('./index');

describe('parseUcs2', function () {
  it(`should parse nothing to ucs2 undefined and str undefined`, function () {
    const result = parseUcs2();

    expect(result).to.deep.equal({
      ucs2: undefined,
      str: undefined,
    });
  });

  it(`should parse '5152\\n兒513F儿' to ucs2 '5152' and str '\\n兒513F儿'`, function () {
    const result = parseUcs2('5152\n兒513F儿');

    expect(result).to.deep.equal({
      ucs2: '5152',
      str: '\n兒513F儿',
    });
  });

  it(`should parse '513F儿' to ucs2 '513F' and str '儿'`, function () {
    const result = parseUcs2('513F儿');

    expect(result).to.deep.equal({
      ucs2: '513F',
      str: '儿',
    });
  });

  it(`should parse 'toi4\\ns' to ucs2 undefined and str 'toi4\\ns'`, function () {
    const result = parseUcs2('toi4\ns');

    expect(result).to.deep.equal({
      ucs2: undefined,
      str: 'toi4\ns',
    });
  });
});
