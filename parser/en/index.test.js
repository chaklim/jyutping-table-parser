'use strict';

const expect = require('chai').expect;
const parseEn = require('./index');

describe('parseEn', function () {
  it(`should parse nothing to en undefined and str undefined`, function () {
    const result = parseEn();

    expect(result).to.deep.equal({
      en: undefined,
      str: undefined,
    });
  });

  it(`should parse '\\ns\\n1\\n1\\n部 5152' to en 's' and str '\\n1\\n1\\n部 5152'`, function () {
    const result = parseEn('\ns\n1\n1\n部 5152');

    expect(result).to.deep.equal({
      en: 's',
      str: '\n1\n1\n部 5152',
    });
  });

  it(`should parse '\\nt\\n1\\n1\\n部 5152' to en 't' and str '\\n1\\n1\\n部 5152'`, function () {
    const result = parseEn('\nt\n1\n1\n部 5152');

    expect(result).to.deep.equal({
      en: 't',
      str: '\n1\n1\n部 5152',
    });
  });

  it(`should parse '\\n1\\n1\\n部 5152' to en undefined and str '1\\n1\\n部 5152'`, function () {
    const result = parseEn('\n1\n1\n部 5152');

    expect(result).to.deep.equal({
      en: undefined,
      str: '1\n1\n部 5152',
    });
  });
});
