'use strict';

const expect = require('chai').expect;
const parseType = require('./index');

describe('parseType', function() {
  it(`should parse nothing to type undefined and str undefined`, function() {
    const result = parseType();
    
    expect(result).to.deep.equal({
      type: undefined,
      str: undefined,
    });
  });

  it(`should parse '****ABCD' to type **** and str 'ABCD'`, function() {
    const result = parseType('****ABCD');
    
    expect(result).to.deep.equal({
      type: ['****'],
      str: 'ABCD',
    });
  });

  it(`should parse '****;#ABC' to type ['****', '#'] and str 'ABC'`, function() {
    const result = parseType('****;#ABC');
    
    expect(result).to.deep.equal({
      type: ['****', '#'],
      str: 'ABC',
    });
  });

  it(`should parse '#;****ABC' to type ['#', '****'] and str 'ABC'`, function () {
    const result = parseType('#;****ABC');

    expect(result).to.deep.equal({
      type: ['#', '****'],
      str: 'ABC',
    });
  });

  it(`should parse '$;****;#AB' to type ['$', '****', '#'] and str 'AB'`, function () {
    const result = parseType('$;****;#AB');

    expect(result).to.deep.equal({
      type: ['$', '****', '#'],
      str: 'AB',
    });
  });

  it(`should parse '\\n$;****;#AB' to type ['$', '****', '#'] and str 'AB'`, function () {
    const result = parseType('\n$;****;#AB');

    expect(result).to.deep.equal({
      type: ['$', '****', '#'],
      str: 'AB',
    });
  });

  it(`should parse '\\nAB' to type undefined and str 'AB'`, function () {
    const result = parseType('\nAB');

    expect(result).to.deep.equal({
      type: undefined,
      str: 'AB',
    });
  });

  it(`should parse '' to type undefined and str ''`, function () {
    const result = parseType('');

    expect(result).to.deep.equal({
      type: undefined,
      str: '',
    });
  });
});
