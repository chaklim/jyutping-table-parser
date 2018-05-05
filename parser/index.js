'use strict';

const parseCh = require('./ch');
const parseCl = require('./cl');
const parseEn = require('./en');
const parseJyutping = require('./jyutping');
const parsePn = require('./pn');
const parseRad = require('./rad');
const parseRef = require('./ref');
const parseRg = require('./rg');
const parseSc = require('./sc');
const parseType = require('./typ');
const parseUcs2 = require('./ucs2');
const hkscsUnicodeConverter = require('hkscs_unicode_converter');

/*
  typ
  jyutping
  en
  rg
  pn
  rad ref(ucs2)
  ref(ch)|ucs2|ch
  (
    jyutping
    en pn cl sc
    ref(ucs2)
    ref(ch)
  )
*/
const parseCharacter = (str) => {
  const strBeforeParse = str;

  const parseTypeResult = parseType(str);
  const parseJyutpingResult = parseJyutping(parseTypeResult.str);
  const parseEnResult = parseEn(parseJyutpingResult.str);
  const parseRgResult = parseRg(parseEnResult.str);
  const parsePnResult = parsePn(parseRgResult.str);
  const parseRadResult = parseRad(parsePnResult.str);
  const parseRefResult = parseRef(parseRadResult.str);
  const parseUcs2Result = parseUcs2(parseRefResult.str);
  const parseChResult = parseCh(parseUcs2Result.str);

  const character = {};
  
  !!parseTypeResult.type && (character.type = parseTypeResult.type);
  !!parseRgResult.rg && (character.rg = parseRgResult.rg);
  !!parseRadResult.rad && (character.rad = parseRadResult.rad);
  !!parseUcs2Result.ucs2 && (character.ucs2 = parseUcs2Result.ucs2);
  !!parseChResult.ch && (character.ch = hkscsUnicodeConverter.convertCharacter(parseChResult.ch));
  if (!!parseJyutpingResult.jyutping || !!parseEnResult.en || !!parsePnResult.pn || !!parseRefResult.ref) {
    const characterInfo = {};
    !!parseJyutpingResult.jyutping && (characterInfo.jyutping = parseJyutpingResult.jyutping);
    !!parseEnResult.en && (characterInfo.en = parseEnResult.en);
    !!parsePnResult.pn && (characterInfo.pn = parsePnResult.pn);
    !!parseRefResult.ref && (characterInfo.ref = parseRefResult.ref);

    character.infoArray = [characterInfo];
  }
  
  if (Object.keys(character).length <= 0) {
    return {
      character: undefined,
      str: strBeforeParse,
    };
  }

  let tempStr = parseChResult.str || '';
  
  while (true) {
    const strBeforeParse = tempStr;
    const parseJyutpingResult = parseJyutping(tempStr);

    const isRgExistAfterJyutping = (
      !Array.isArray(parseJyutpingResult.jyutping) ||
      typeof parseJyutpingResult.str !== 'string' ||
      parseJyutpingResult.str[0] !== '\n'
    );

    if (isRgExistAfterJyutping) {
      tempStr = strBeforeParse;
      break;
    }
    
    const parseEnResult = parseEn(parseJyutpingResult.str);
    const parsePnResult = parsePn(parseEnResult.str);
    const parseClResult = parseCl(parsePnResult.str);
    const parseScResult = parseSc(parseClResult.str);
    const parseRefResult = parseRef(parseScResult.str, { isIncludeLastMatch: true });

    const characterInfo = {};
    !!parseJyutpingResult.jyutping && (characterInfo.jyutping = parseJyutpingResult.jyutping);
    !!parseEnResult.en && (characterInfo.en = parseEnResult.en);
    !!parsePnResult.pn && (characterInfo.pn = parsePnResult.pn);
    !!parseClResult.cl && (characterInfo.cl = parseClResult.cl);
    !!parseScResult.sc && (characterInfo.sc = parseScResult.sc);
    !!parseRefResult.ref && (characterInfo.ref = parseRefResult.ref);

    const haveCharacterInfo = Object.keys(characterInfo).length > 0;
    if (!Array.isArray(character.infoArray) && haveCharacterInfo) {
      character.infoArray = [];
    }
    if (haveCharacterInfo) {
      character.infoArray.push(characterInfo);
    }

    tempStr = parseRefResult.str;
  }

  return {
    character,
    str: tempStr || '',
  };
};

module.exports = parseCharacter;
