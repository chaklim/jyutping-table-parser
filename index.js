'use strict';

const fs = require('fs');
const parseCharacter = require('./parser');

const parseJyutpingInput = (filePath = `${__dirname}/input/input.txt`) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const characters = [];

  let tempStr = content;  
  while (true) {
    const { character, str } = parseCharacter(tempStr);
    if (!character) {
      break;
    }

    if (typeof tempStr !== 'string' || tempStr.length <= 0) {
      break;
    }

    characters.push(character);
    tempStr = str;
  }

  return characters;
};

module.exports = Object.freeze({
  parseJyutpingInput
});