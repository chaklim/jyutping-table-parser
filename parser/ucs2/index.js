'use strict';

/*
  ucs2 ( [3-9A-F]{1}[0-9A-F]{3} )
*/

const parseUcs2 = (str) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      ucs2: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n') || str.startsWith(' ')) {
    return parseUcs2(str.substring(1));
  }

  const re = /^[3-9A-F]{1}[0-9A-F]{3}/;
  const match = str.match(re);
  const ucs2 = !!match && match.length > 0 ? match[0] : undefined;

  return {
    ucs2,
    str: str.substring(typeof ucs2 === 'string' ? ucs2.length : 0)
  };
};

module.exports = parseUcs2;
