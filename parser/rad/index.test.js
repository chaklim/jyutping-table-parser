'use strict';

const expect = require('chai').expect;
const parseRad = require('./index');

describe('parseRad', function () {
  it(`should parse nothing to rad undefined and str undefined`, function () {
    const result = parseRad();

    expect(result).to.deep.equal({
      rad: undefined,
      str: undefined,
    });
  });

  it(`should parse '部 5152\\n兒513F儿' to rad true and str ' 5152\\n兒513F儿'`, function () {
    const result = parseRad('部 5152\n兒513F儿');

    expect(result).to.deep.equal({
      rad: true,
      str: ' 5152\n兒513F儿',
    });
  });

  it(`should parse '1\\n部 5152\\n兒513F儿' to rad false and str '1\\n部 5152\\n兒513F儿'`, function () {
    const result = parseRad('1\n部 5152\n兒513F儿');

    expect(result).to.deep.equal({
      rad: false,
      str: '1\n部 5152\n兒513F儿',
    });
  });
});
