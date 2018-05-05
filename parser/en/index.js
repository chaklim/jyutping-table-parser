'use strict';

/*
  en ( '' | 't' | 's' )
*/

const possibleEns = ['t', 's', ''];

const parseEn = (str) => {
  if (typeof str !== 'string') {
    return {
      en: undefined,
      str: undefined,
    };
  }
  if (!str.startsWith('\n')) {
    return {
      en: undefined,
      str,
    };
  }
  str = str.substring(1);
  
  for (const en of possibleEns) {
    if (str.startsWith(en)) {
      return {
        en: !!en ? en : undefined,
        str: str.substring(en.length)
      };
    }
  }

  return {
    en: undefined,
    str,
  };
};

module.exports = parseEn;
