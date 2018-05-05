'use strict';

/*
  pn ( '' | [1-9]{1}[0-2]{0,1} )
*/

const parsePn = (str) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      pn: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n') || str.startsWith(' ')) {
    return parsePn(str.substring(1));
  }

  const re = /^[1-9]{1}[0-2]{0,1}/;
  const match = str.match(re);
  const pnStr = !!match && match.length > 0 && !!match[0] ? match[0] : undefined;
  const pn = !!pnStr ? parseInt(pnStr, 10) : undefined;

  return {
    pn,
    str: str.substring(typeof pnStr === 'string' ? pnStr.length : 0)
  };
};

module.exports = parsePn;
