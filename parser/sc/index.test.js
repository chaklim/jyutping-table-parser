'use strict';

const expect = require('chai').expect;
const parseSc = require('./index');

describe('parseSc', function () {
  it(`should parse nothing to sc undefined and str undefined`, function () {
    const result = parseSc();

    expect(result).to.deep.equal({
      sc: undefined,
      str: undefined,
    });
  });

  it(`should parse '1.3\\nhei3' to sc '1.3' and str '\\nhei3'`, function () {
    const result = parseSc('1.3\nhei3');

    expect(result).to.deep.equal({
      sc: '1.3',
      str: '\nhei3',
    });
  });

  it(`should parse '2\\nji4' to sc '2' and str '\\nji4'`, function () {
    const result = parseSc('2\nji4');

    expect(result).to.deep.equal({
      sc: '2',
      str: '\nji4',
    });
  });

  it(`should parse '\\n1.3.16\\nhei3' to sc undefined and str '\\n1.3.16\\nhei3'`, function () {
    const result = parseSc('\n1.3.16\nhei3');

    expect(result).to.deep.equal({
      sc: undefined,
      str: '\n1.3.16\nhei3',
    });
  });
});
