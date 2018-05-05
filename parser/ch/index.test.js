'use strict';

const expect = require('chai').expect;
const parseCh = require('./index');

describe('parseCh', function () {
  it(`should parse nothing to ch undefined and str undefined`, function () {
    const result = parseCh();

    expect(result).to.deep.equal({
      ch: undefined,
      str: undefined,
    });
  });

  it(`should parse '郥\\n<\\nlik6' to jyutping '郥' and str '\\n<\\nlik6'`, function () {
    const result = parseCh('郥\n<\nlik6');

    expect(result).to.deep.equal({
      ch: '郥',
      str: '\n<\nlik6',
    });
  });

  it(`should parse '部\\nhaau42' to jyutping '部' and str '\\nhaau42'`, function () {
    const result = parseCh('部\nhaau42');

    expect(result).to.deep.equal({
      ch: '部',
      str: '\nhaau42',
    });
  });

  it(`should parse 'jau12\\n13400㐀' to jyutping undefined and str 'jau12\\n13400㐀'`, function () {
    const result = parseCh('jau12\n13400㐀');

    expect(result).to.deep.equal({
      ch: undefined,
      str: 'jau12\n13400㐀',
    });
  });

  it(`should parse '\\nzung13' to jyutping '𨧀' and str '\\nzung13'`, function () {
    const result = parseCh('\nzung13');

    expect(result).to.deep.equal({
      ch: '',
      str: '\nzung13',
    });
  });
});
