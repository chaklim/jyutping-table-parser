'use strict';

const expect = require('chai').expect;
const parseCl = require('./index');

describe('parseCl', function () {
  it(`should parse nothing to cl undefined and str undefined`, function () {
    const result = parseCl();

    expect(result).to.deep.equal({
      cl: undefined,
      str: undefined,
    });
  });

  it(`should parse '又 2\\njan4' to cl true and str ' 2\\njan4'`, function () {
    const result = parseCl('又 2\njan4');

    expect(result).to.deep.equal({
      cl: true,
      str: ' 2\njan4',
    });
  });

  it(`should parse '2 又 2\\njan4' to cl false and str '2 又 2\\njan4'`, function () {
    const result = parseCl('2 又 2\njan4');

    expect(result).to.deep.equal({
      cl: false,
      str: '2 又 2\njan4',
    });
  });
});
