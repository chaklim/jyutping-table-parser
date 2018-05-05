'use strict';

/*
  ch ( unicode character between [3400 - F7EE] )
*/

const parseCh = (str) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      ch: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n')) {
    return parseCh(str.substring(1));
  }

  const re = /^[\u3400-\uF7EE]{1}/;
  const match = str.match(re);
  const ch = !!match && match.length > 0 && !!match[0] ? match[0] : undefined;

  return {
    ch,
    str: str.substring(typeof ch === 'string' ? ch.length : 0)
  };
};

module.exports = parseCh;
