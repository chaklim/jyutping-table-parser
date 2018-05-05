'use strict';

/*
  typ ( [''|<|#|>|S|$|*|**|***|****], ';' separated )
*/

const possibleTypes = ['****', '***', '**', '*', '$', 'S', '>', '#', '<', ''];
const separator = ';';

const parseType = (str) => {
  if (typeof str !== 'string') {
    return {
      type: undefined,
      str: undefined,
    };
  }
  if (str.startsWith('\n')) {
    return parseType(str.substring(1));
  }

  const types = [];
  let tempStr = str;
  for (let index = 0; index < possibleTypes.length; index++) {
    const type = possibleTypes[index];

    if (!tempStr.startsWith(type)) {
      continue;
    }

    if (!!type) {
      types.push(type);
      index = -1;

      tempStr = tempStr.substring(type.length);
    }
    if (tempStr.startsWith(separator)) {
      tempStr = tempStr.substring(1);
    }
  }

  return {
    type: types.length > 0 ? types : undefined,
    str: tempStr,
  };
};
  
module.exports = parseType;
