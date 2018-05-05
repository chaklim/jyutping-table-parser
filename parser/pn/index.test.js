'use strict';

const expect = require('chai').expect;
const parsePn = require('./index');

describe('parsePn', function () {
  it(`should parse nothing to pn undefined and str undefined`, function () {
    const result = parsePn();

    expect(result).to.deep.equal({
      pn: undefined,
      str: undefined,
    });
  });

  it(`should parse '1\\n99E1\\n駡3437㐷' to pn 1 and str '\\n99E1\\n駡3437㐷'`, function () {
    const result = parsePn('1\n99E1\n駡3437㐷');

    expect(result).to.deep.equal({
      pn: 1,
      str: '\n99E1\n駡3437㐷',
    });
  });

  it(`should parse 's\\n1\\n1\\n99E1\\n' to pn undefined and str 's\\n1\\n\\n99E1\\n'`, function () {
    const result = parsePn('s\n1\n1\n99E1\n');

    expect(result).to.deep.equal({
      pn: undefined,
      str: 's\n1\n1\n99E1\n',
    });
  });

  it(`should parse '2 又 1.3\\nhei3' to pn 2 and str ' 又 1.3\\nhei3'`, function () {
    const result = parsePn('2 又 1.3\nhei3');

    expect(result).to.deep.equal({
      pn: 2,
      str: ' 又 1.3\nhei3',
    });
  });
});
