'use strict';

/*
  jyutping ( [a-z]{1,}[1-9]{1}, space separated )
*/

const parseJyutping = (str) => {
  if (typeof str !== 'string' || str.length <= 0) {
    return {
      jyutping: undefined,
      str: undefined,
    };
  }
  
  const jyutpingArray = [];
  let tempStr = str;

  while (true) {
    let strBeforeParse = tempStr;
    if (tempStr.startsWith(' ') || tempStr.startsWith('\n')) {
      tempStr = tempStr.substring(1);
    }

    const re = /^[a-z]{1,}[1-9]{1}/;
    const match = tempStr.match(re);
    const jyutping = !!match && match.length > 0 && !!match[0] ? match[0] : undefined;
    
    if (!!jyutping) {
      jyutpingArray.push(jyutping.trim());

      tempStr = tempStr.substring(jyutping.length);
    } else {
      tempStr = strBeforeParse;
      break;
    }

    
    // return {
    //   jyutping: !!jyutping ? [jyutping] : undefined,
    //   str: str.substring(typeof jyutping === 'string' ? jyutping.length : 0)
    // };
  }

  return {
    jyutping: jyutpingArray.length > 0 ? jyutpingArray : undefined,
    str: tempStr,
  };
};

module.exports = parseJyutping;
