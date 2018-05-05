'use strict';

/*
  rad ( '' | '部' )
*/

const possibleRad = ['部', ''];

const parseRad = (str) => {
  if (typeof str !== 'string') {
    return {
      rad: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n') || str.startsWith(' ')) {
    return parseRad(str.substring(1));
  }

  for (const rad of possibleRad) {
    if (str.startsWith(rad)) {
      return {
        rad: !!rad,
        str: str.substring(rad.length)
      };
    }
  }

  return {
    rad: undefined,
    str,
  };
};

module.exports = parseRad;
