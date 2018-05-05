'use strict';

const expect = require('chai').expect;
const parseRg = require('./index');

describe('parseRg', function () {
  it(`should parse nothing to rg undefined and str undefined`, function () {
    const result = parseRg();

    expect(result).to.deep.equal({
      rg: undefined,
      str: undefined,
    });
  });

  it(`should parse '1\\n1\\n99E1' to rg 1 and str '\\n1\\n99E1'`, function () {
    const result = parseRg('1\n1\n99E1');

    expect(result).to.deep.equal({
      rg: 1,
      str: '\n1\n99E1',
    });
  });

  it(`should parse 'ai31\\n1\\n5C53' to rg undefined and str 'ai31\\n1\\n5C53'`, function () {
    const result = parseRg('ai31\n1\n5C53');

    expect(result).to.deep.equal({
      rg: undefined,
      str: 'ai31\n1\n5C53',
    });
  });
});
