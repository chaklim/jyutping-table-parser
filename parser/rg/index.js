'use strict';

/*
  rg ( '' | '1' | '2' | '3' )
*/

const possibleRgs = ['3', '2', '1', ''];

const parseRg = (str) => {
  if (typeof str !== 'string') {
    return {
      rg: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n')) {
    return parseRg(str.substring(1));
  }

  for (const rg of possibleRgs) {
    if (str.startsWith(rg)) {
      return {
        rg: !!rg ? parseInt(rg, 10) : undefined,
        str: str.substring(rg.length)
      };
    }
  }

  return {
    rg: undefined,
    str,
  };
};

module.exports = parseRg;
