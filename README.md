# Jyutping Table Parser
[![Build Status](https://travis-ci.org/chaklim/jyutping-table-parser.svg?branch=master)](https://travis-ci.org/chaklim/jyutping-table-parser)

just a JPTableFull.pdf parser

[JPTableFull PDF Download](http://www.iso10646hk.net/download/jp/doc/JPTableFull.pdf)

## Installation

  `npm install jyutping-table-parser`

## Usage

    const jyutpingTableParser = require('jyutping-table-parser');

    const characters = jyutpingTableParser.parseJyutpingInput();

  Output (characters) should be 

    [
      {
        type: TYPE,
        rg: RG,
        rad: RAD,
        ucs2: UCS2,
        ch: CH,
        infoArray: [
          {
            jyutping: JYUTPING,
            en: EN,
            pn: PN,
            cl: CL,
            sc: SC,
            ref: [
              {
                ucs2: UCS2,
                ch: CH,
              },
              ...
            ]
          },
          ...
        ]
      },
      ...
    ]

---
## Output Value Description

#### TYPE - Character Type.
- (Optional) Array of string with possible values
          
      '<', '#', '>', 'S', '$', '*', '**', '***', '****'
  
#### RG
- Number with possible values 1, 2 or 3.

#### RAD - Radical.
- (Optional) Boolean, true if the character is radical

#### UCS2 - UCS-2 encoding value.
- String. Range between '3400' - 'F7EE'

#### CH - The character.
- String. Unicode re-mapped to HKSCS_2016 one.
  
#### JYUTPING - Jyutping values
- (Optional) Array of String each contains a jyutping value. 
 
#### EN
  - (Optional) String with possible values 's', 't'

#### PN - Phonetic.
  - Number starts with 1.
  
#### CL
  - (Optional) Boolean.

#### SC
  - (Optional) String with value '1.x' or '2'

For more detailed value description, please reference the original PDF section 5.

---

## Output Example
    
    {
      "type": [
        ">"
      ],
      "rg": 1,
      "ucs2": "9673",
      "ch": "陳",
      "infoArray": [
        {
          "jyutping": [
            "can4"
          ],
          "en": "t",
          "pn": 1
        },
        {
          "jyutping": [
            "can2"
          ],
          "en": "t",
          "pn": 2,
          "cl": true,
          "sc": "2"
        },
        {
          "jyutping": [
            "zan6"
          ],
          "en": "t",
          "pn": 3
        }
      ]
    }

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.