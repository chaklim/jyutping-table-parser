'use strict';

const expect = require('chai').expect;
const parseRef = require('./index');

describe('parseRef', function () {
  it(`should parse nothing to ref undefined and str undefined`, function () {
    const result = parseRef();

    expect(result).to.deep.equal({
      ref: undefined,
      str: undefined,
    });
  });

  it(`should parse '5C53\\n屓3792㞒\\nngai3' to ref { ucs2: ['5C53'], ch: ['屓'] } and str '3792㞒\\nngai3'`, function () {
    const result = parseRef('5C53\n屓3792㞒\nngai3');

    expect(result).to.deep.equal({
      ref: [
        {
          ucs2: '5C53',
          ch: '屓',
        },
      ],
      str: '3792㞒\nngai3',
    });
  });

  it(`should parse '994C 64B0\\n撰饌4275䉵\\nzaan3' to ref { ucs2: ['994C', '64B0'], ch: ['撰', '饌'] } and str '4275䉵\\nzaan3'`, function () {
    const result = parseRef('994C 64B0\n撰饌4275䉵\nzaan3');

    expect(result).to.deep.equal({
      ref: [
        {
          ucs2: '994C',
          ch: '饌',
        },
        {
          ucs2: '64B0',
          ch: '撰',
        },
      ],
      str: '4275䉵\nzaan3',
    });
  });

  it(`should parse '81FA 6AAF\\n檯臺\\n98B1\\n颱53F0台\\nji4' to 
      ref { ucs2: ['81FA', '6AAF', '98B1'], ch: ['檯', '臺', '颱'] },
      str '53F0台\\nji4'`, function () {
    const result = parseRef('81FA 6AAF\n檯臺\n98B1\n颱53F0台\nji4');

    expect(result).to.deep.equal({
      ref: [
        {
          ucs2: '81FA',
          ch: '臺',
        },
        {
          ucs2: '6AAF',
          ch: '檯',
        },
        {
          ucs2: '98B1',
          ch: '颱',
        },
      ],
      str: '53F0台\nji4',
    });
  });

  it(`should parse '＠3404㐄' to ref undefined and str '3404㐄'`, function () {
    const result = parseRef('＠3404㐄');

    expect(result).to.deep.equal({
      ref: undefined,
      str: '3404㐄',
    });
  });

  it(`should parse '9F9C\\n龜' to ref undefined and str '9F9C龜'`, function () {
    const result = parseRef('9F9C\n龜');

    expect(result).to.deep.equal({
      ref: undefined,
      str: '9F9C龜',
    });
  })
});
