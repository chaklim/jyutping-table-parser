'use strict';

const expect = require('chai').expect;
const parseJyutping = require('./index');

describe('parseJyutping', function () {
  it(`should parse nothing to jyutping undefined and str undefined`, function () {
    const result = parseJyutping();

    expect(result).to.deep.equal({
      jyutping: undefined,
      str: undefined,
    });
  });

  it(`should parse 'jau12\\n13400㐀' to jyutping ['jau1'] and str '2\\n13400㐀'`, function () {
    const result = parseJyutping('jau12\n13400㐀');

    expect(result).to.deep.equal({
      jyutping: ['jau1'],
      str: '2\n13400㐀',
    });
  });

  it(`should parse 'kwaa12\\n1＠3404㐄' to jyutping ['kwaa1'] and str '2\\n1＠3404㐄'`, function () {
    const result = parseJyutping('kwaa12\n1＠3404㐄');

    expect(result).to.deep.equal({
      jyutping: ['kwaa1'],
      str: '2\n1＠3404㐄',
    });
  });

  it(`should parse '\\nkwaa12\\n1＠3404㐄' to jyutping ['kwaa1'] and str '2\\n1＠3404㐄'`, function () {
    const result = parseJyutping('\nkwaa12\n1＠3404㐄');

    expect(result).to.deep.equal({
      jyutping: ['kwaa1'],
      str: '2\n1＠3404㐄',
    });
  });

  it(`should parse '****\\nkwaa12\\n1＠3404㐄' to jyutping undefined and str unchanged`, function () {
    const result = parseJyutping('****\nkwaa12\n1＠3404㐄');

    expect(result).to.deep.equal({
      jyutping: undefined,
      str: '****\nkwaa12\n1＠3404㐄',
    });
  });

  it(`should parse 'jing1 cam4\\ns 2 又' to jyutping ['jing1', 'cam4'] and str '\\ns 2 又'`, function () {
    const result = parseJyutping('jing1 cam4\ns 2 又');

    expect(result).to.deep.equal({
      jyutping: ['jing1', 'cam4'],
      str: '\ns 2 又',
    });
  });
});
