'use strict';

/*
  sc ( '' | [1-2]{1}(\.[0-9]{1}){0,1} )
*/

const parseSc = (str) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      sc: undefined,
      str: undefined,
    };
  }
  if (str.startsWith(' ')) {
    return parseSc(str.substring(1));
  }

  const strBeforeParse = str;

  const re = /^[1-2]{1}(\.[0-9]{1}){0,1}/;
  const match = str.match(re);
  const sc = !!match && match.length > 0 && !!match[0] ? match[0] : undefined;

  const tempStr = str.substring(typeof sc === 'string' ? sc.length : 0);
  if (tempStr.length > 0 && tempStr[0] !== '\n') {
    return {
      sc: undefined,
      str: strBeforeParse,
    };
  }

  return {
    sc,
    str: str.substring(typeof sc === 'string' ? sc.length : 0)
  };
};

module.exports = parseSc;
