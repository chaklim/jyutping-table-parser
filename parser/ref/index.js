'use strict';

const parseUcs2 = require('../ucs2');
const parseCh = require('../ch');
const hkscsUnicodeConverter = require('hkscs_unicode_converter');

/*
  ref (ucs2) ( space separated )
  ref (ch) (not space separated)
  ref ('')
*/

const parseRef = (str, options = { isIncludeLastMatch: false }) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      ref: undefined,
      str: undefined,
    };
  }
  
  const ucs2Array = [];
  const chArray = [];
  
  let previousStr = str;
  let tempStr = str;
  do {
    if (previousStr !== tempStr) {
      previousStr = tempStr;
    }

    while (true) {
      const result = parseUcs2(tempStr);
      const { ucs2 } = result;
      !!ucs2 && ucs2Array.push(ucs2);

      tempStr = result.str;

      if (!ucs2) {
        break;
      }
    }

    while (true) {
      const result = parseCh(tempStr);
      const { ch } = result;
      !!ch && chArray.push(ch);

      tempStr = result.str;

      if (!ch) {
        break;
      }
    }

    if (typeof tempStr === 'string' && tempStr.startsWith('＠')) {
      tempStr = tempStr.substring('＠'.length);

      // ucs2Array.push('@');
      // chArray.push('@');
    }
  } while (previousStr !== tempStr);

  if (ucs2Array.length <= 0 || chArray.length <= 0) {
    return {
      ref: undefined,
      str,
    };
  }

  if (options.isIncludeLastMatch) {
    const ref = mergeUcs2AndCh(ucs2Array, chArray);
    return {
      ref: Array.isArray(ref) && ref.length > 0 ? ref : undefined,
      str: tempStr,
    };
  }

  const lastUcs2 = ucs2Array.pop();
  const lastCh = chArray.pop();
  const ref = mergeUcs2AndCh(ucs2Array, chArray);
  return {
    ref: Array.isArray(ref) && ref.length > 0 ? ref : undefined,
    str: lastUcs2 + lastCh + (typeof tempStr === 'string' ? '\n' + tempStr : ''),
  };
};

const mergeUcs2AndCh = (ucs2Array, chArray) => {
  return ucs2Array.map(ucs2 => {
    for (const ch of chArray) {
      if (typeof ch !== 'string' || typeof ucs2 !== 'string') {
        continue;
      }
      if (ch.codePointAt(0).toString(16).toUpperCase() === ucs2) {
        return {
          ucs2,
          ch: hkscsUnicodeConverter.convertCharacter(ch),
        };
      }
    }
    return {
      ucs2,
    };
  });
}

module.exports = parseRef;
