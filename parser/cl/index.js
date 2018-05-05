'use strict';

/*
  cl ( '' | '又' )
*/

const possibleCl = ['又', ''];

const parseCl = (str) => {
  if (typeof str !== 'string') {
    return {
      cl: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n') || str.startsWith(' ')) {
    return parseCl(str.substring(1));
  }

  for (const cl of possibleCl) {
    if (str.startsWith(cl)) {
      return {
        cl: !!cl,
        str: str.substring(cl.length)
      };
    }
  }

  return {
    cl: undefined,
    str,
  };
};

module.exports = parseCl;
