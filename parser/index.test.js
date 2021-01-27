'use strict';

const expect = require('chai').expect;
const parseCharacter = require('./index');

describe('parseCharacter', function () {
  it(`should parse nothing to word undefined and str undefined`, function () {
    const result = parseCharacter();

    expect(result).to.deep.equal({
      character: undefined,
      str: undefined,
    });
  });

  // new character breaking case
  it(`should parse 'zi12\\n15001倁\\nbing3\\nt\\n1\\n1\\n5E76\\n并5002倂\\nping3\\nt 2 又\\n5E76\\n并\\nbing6\\nt 3 又\\n5E76\\n并'`, function() {
    const result = parseCharacter('zi12\n15001倁\nbing3\nt\n1\n1\n5E76\n并5002倂\nping3\nt 2 又\n5E76\n并\nbing6\nt 3 又\n5E76\n并');

    expect(result).to.deep.equal({
      character: {
        ch: '倁',
        ucs2: "5001",
        rg: 2,
        infoArray: [
          {
            jyutping: ["zi1"],
            pn: 1,
          },
        ],
      },
      str: '\nbing3\nt\n1\n1\n5E76\n并5002倂\nping3\nt 2 又\n5E76\n并\nbing6\nt 3 又\n5E76\n并',
    })
  });

  // new character breaking case
  it(`should parse character two times 'zaat31\\n1672D札\\nzaat2\\n2 又 2\\nzaap3\\n3 又\\naat3\\n4\\nngaat3\\n5 又 1.3\\nseot6\\ns\\n1\\n1\\n8853 672F\\n术術672E朮\\nseot6\\nt 1\\n672F\\n术'`, function() {
    const result = parseCharacter('zaat31\n1672D札\nzaat2\n2 又 2\nzaap3\n3 又\naat3\n4\nngaat3\n5 又 1.3\nseot6\ns\n1\n1\n8853 672F\n术術672E朮\nseot6\nt 1\n672F\n术');
    const result2 = parseCharacter(result.str);

    expect(result).to.deep.equal({
      character: {
        ch: '札',
        ucs2: "672D",
        rg: 1,
        infoArray: [
          {
            jyutping: ["zaat3"],
            pn: 1,
          },
          {
            jyutping: ["zaat2"],
            pn: 2,
            cl: true,
            sc: '2',
          },
          {
            jyutping: ["zaap3"],
            pn: 3,
            cl: true,
          },
          {
            jyutping: ["aat3"],
            pn: 4,
          },
          {
            jyutping: ["ngaat3"],
            pn: 5,
            cl: true,
            sc: '1.3',
          },
        ],
      },
      str: '\nseot6\ns\n1\n1\n8853 672F\n术術672E朮\nseot6\nt 1\n672F\n术',
    });

    expect(result2).to.deep.equal({
      character: {
        ch: '朮',
        ucs2: "672E",
        rg: 1,
        infoArray: [
          {
            jyutping: ['seot6'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '8853',
                ch: '術'
              },
              {
                ucs2: '672F',
                ch: '术'
              },
            ],
          },
          {
            jyutping: ['seot6'],
            en: 't',
            pn: 1,
            ref: [
              {
                ucs2: '672F',
                ch: '术'
              },
            ],
          },
        ],
      },
      str: '',
    });
  });

  it(`should parse 'jau12\\n13400㐀'`, function () {
    const result = parseCharacter('jau12\n13400㐀');

    expect(result).to.deep.equal({
      character: {
        ch: '㐀',
        ucs2: "3400",
        rg: 2,
        infoArray: [
          {
            jyutping: ["jau1"],
            pn: 1,
          },
        ],
      },
      str: '',
    });
  });

  it(`should parse '****\\nkwaa12\\n1＠3404㐄'`, function () {
    const result = parseCharacter('****\nkwaa12\n1＠3404㐄');

    expect(result).to.deep.equal({
      character: {
        type: ['****'],
        rg: 2,
        ucs2: '3404',
        ch: '㐄',
        infoArray: [
          {
            jyutping: ['kwaa1'],
            pn: 1,
          }
        ]
      },
      str: '',
    });
  });

  it(`should parse 'ng52\\n13405㐅\\nm5\\n2 又 1.6'`, function () {
    const result = parseCharacter('ng52\n13405㐅\nm5\n2 又 1.6');

    expect(result).to.deep.equal({
      character: {
        rg: 2,
        ucs2: '3405',
        ch: '㐅',
        infoArray: [
          {
            jyutping: ['ng5'],
            pn: 1,
          },
          {
            jyutping: ['m5'],
            pn: 2,
            cl: true,
            sc: '1.6',
          }
        ]
      },
      str: '',
    });
  });

  it(`should parse '#\\nmaa6\\ns\\n1\\n1\\n99E1\\n駡3437㐷\\nmaa3\\ns 2 又\\n99E1\\n駡\\snhim32'`, function () {
    const result = parseCharacter('#\nmaa6\ns\n1\n1\n99E1\n駡3437㐷\nmaa3\ns 2 又\n99E1\n駡\nhim32');

    expect(result).to.deep.equal({
      character: {
        type: ['#'],
        rg: 1,
        ucs2: '3437',
        ch: '㐷',
        infoArray: [
          {
            jyutping: ['maa6'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '99E1',
                ch: '駡'
              },
            ],
          },
          {
            jyutping: ['maa3'],
            en: 's',
            pn: 2,
            cl: true,
            ref: [
              {
                ucs2: '99E1',
                ch: '駡',
              },
            ],
          },
        ]
      },
      str: 'him32',
    });
  });

  it(`should parse '***\\nai31\\n1\\n5C53\\n屓3792㞒\\nngai3\\n2 又 1.3\\nhei3\\n3 又\\n5C53\\n屓'`, function () {
    const result = parseCharacter('***\nai31\n1\n5C53\n屓3792㞒\nngai3\n2 又 1.3\nhei3\n3 又\n5C53\n屓');

    expect(result).to.deep.equal({
      character: {
        type: ['***'],
        rg: 1,
        ucs2: '3792',
        ch: '㞒',
        infoArray: [
          {
            jyutping: ['ai3'],
            pn: 1,
            ref: [
              {
                ucs2: '5C53',
                ch: '屓',
              },
            ],
          },
          {
            jyutping: ['ngai3'],
            pn: 2,
            cl: true,
            sc: '1.3'
          },
          {
            jyutping: ['hei3'],
            pn: 3,
            cl: true,
            ref: [
              {
                ucs2: '5C53',
                ch: '屓'
              },
            ],
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '***\\nzaan61\\n1\\n994C 64B0\\n撰饌4275䉵\\nzaan3\\n2 又\\n64B0\\n撰'`, function () {
    const result = parseCharacter('***\nzaan61\n1\n994C 64B0\n撰饌4275䉵\nzaan3\n2 又\n64B0\n撰');

    expect(result).to.deep.equal({
      character: {
        type: ['***'],
        rg: 1,
        ucs2: '4275',
        ch: '䉵',
        infoArray: [
          {
            jyutping: ['zaan6'],
            pn: 1,
            ref: [
              {
                ucs2: '994C',
                ch: '饌',
              },
              {
                ucs2: '64B0',
                ch: '撰',
              },
            ],
          },
          {
            jyutping: ['zaan3'],
            pn: 2,
            cl: true,
            ref: [
              {
                ucs2: '64B0',
                ch: '撰',
              },
            ],
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '<\\nji4\\ns\\n1\\n1\\n部 5152\\n兒513F儿\\nji1\\ns 2 又 2\\njan4\\ns 3\\njan4\\nt 1'`, function () {
    const result = parseCharacter('<\nji4\ns\n1\n1\n部 5152\n兒513F儿\nji1\ns 2 又 2\njan4\ns 3\njan4\nt 1');

    expect(result).to.deep.equal({
      character: {
        type: ['<'],
        rg: 1,
        rad: true,
        ucs2: '513F',
        ch: '儿',
        infoArray: [
          {
            jyutping: ['ji4'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '5152',
                ch: '兒',
              },
            ],
          },
          {
            jyutping: ['ji1'],
            en: 's',
            pn: 2,
            cl: true,
            sc: '2',
          },
          {
            jyutping: ['jan4'],
            en: 's',
            pn: 3,
          },
          {
            jyutping: ['jan4'],
            en: 't',
            pn: 1,
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse multiple ref for word and multiple related words`, function () {
    const result = parseCharacter('<\ntoi4\ns\n1\n1\n81FA 6AAF\n檯臺\n98B1\n颱53F0台\nji4\ns 2\ntoi2\ns 3\n6AAF\n檯\ntoi4\nt 1\ntoi2\nt 2 又 2\nji4\nt 3');

    expect(result).to.deep.equal({
      character: {
        type: ['<'],
        rg: 1,
        ucs2: '53F0',
        ch: '台',
        infoArray: [
          {
            jyutping: ['toi4'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '81FA',
                ch: '臺',
              },
              {
                ucs2: '6AAF',
                ch: '檯',
              },
              {
                ucs2: '98B1',
                ch: '颱'
              },
            ],
          },
          {
            jyutping: ['ji4'],
            en: 's',
            pn: 2,
          },
          {
            jyutping: ['toi2'],
            en: 's',
            pn: 3,
            ref: [
              {
                ucs2: '6AAF',
                ch: '檯',
              },
            ],
          },
          {
            jyutping: ['toi4'],
            en: 't',
            pn: 1,
          },
          {
            jyutping: ['toi2'],
            en: 't',
            pn: 2,
            cl: true,
            sc: '2',
          },
          {
            jyutping: ['ji4'],
            en: 't',
            pn: 3,
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '<;#\\nzung1\\ns\\n1\\n1\\n9418 937E\\n鍾鐘\\n9221\\n鈡949F钟'`, function () {
    const result = parseCharacter('<;#\nzung1\ns\n1\n1\n9418 937E\n鍾鐘\n9221\n鈡949F钟');

    expect(result).to.deep.equal({
      character: {
        type: ['<', '#'],
        rg: 1,
        ucs2: '949F',
        ch: '钟',
        infoArray: [
          {
            jyutping: ['zung1'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '9418',
                ch: '鐘',
              },
              {
                ucs2: '937E',
                ch: '鍾',
              },
              {
                ucs2: '9221',
                ch: '鈡',
              },
            ],
          }
        ]
      },
      str: '',
    });
  });

  it(`should parse the word '龟'`, function () {
    const result = parseCharacter('<\ngwai1\ns\n1\n1\n9F9C\n龜9F9F龟\ngwan1\ns 2\n9F9C\n龜\nkau1\ns 3\n9F9C\n龜\ngau1\ns 4 又\n9F9C\n龜');

    expect(result).to.deep.equal({
      character: {
        type: ['<'],
        rg: 1,
        ucs2: '9F9F',
        ch: '龟',
        infoArray: [
          {
            jyutping: ['gwai1'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '9F9C',
                ch: '龜',
              },
            ],
          },
          {
            jyutping: ['gwan1'],
            en: 's',
            pn: 2,
            ref: [
              {
                ucs2: '9F9C',
                ch: '龜',
              },
            ],
          },
          {
            jyutping: ['kau1'],
            en: 's',
            pn: 3,
            ref: [
              {
                ucs2: '9F9C',
                ch: '龜',
              },
            ],
          },
          {
            jyutping: ['gau1'],
            en: 's',
            pn: 4,
            cl: true,
            ref: [
              {
                ucs2: '9F9C',
                ch: '龜',
              },
            ],
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '#\\nle4\\ns\\n1\\n1EAE9\\nlei4\\ns 2\\n56C4\\n囄\\nle4\\nt 1'`, function () {
    const result = parseCharacter('#\nle4\ns\n1\n1EAE9\nlei4\ns 2\n56C4\n囄\nle4\nt 1');

    expect(result).to.deep.equal({
      character: {
        type: ['#'],
        rg: 1,
        ucs2: 'EAE9',
        ch: '𠻗',
        infoArray: [
          {
            jyutping: ['le4'],
            en: 's',
            pn: 1,
          },
          {
            jyutping: ['lei4'],
            en: 's',
            pn: 2,
            ref: [
              {
                ucs2: '56C4',
                ch: '囄',
              },
            ],
          },
          {
            jyutping: ['le4'],
            en: 't',
            pn: 1,
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '***\\ngung61\\n15171共\\ngung1\\n2\\n606D 4F9B\\n供恭\\ngung2\\n3\\n62F1\\n拱'`, function () {
    const result = parseCharacter('***\ngung61\n15171共\ngung1\n2\n606D 4F9B\n供恭\ngung2\n3\n62F1\n拱');

    expect(result).to.deep.equal({
      character: {
        type: ['***'],
        rg: 1,
        ucs2: '5171',
        ch: '共',
        infoArray: [
          {
            jyutping: ['gung6'],
            pn: 1,
          },
          {
            jyutping: ['gung1'],
            pn: 2,
            ref: [
              {
                ucs2: '606D',
                ch: '恭',
              },
              {
                ucs2: '4F9B',
                ch: '供',
              },
            ],
          },
          {
            jyutping: ['gung2'],
            pn: 3,
            ref: [
              {
                ucs2: '62F1',
                ch: '拱',
              },
            ],
          },
        ]
      },
      str: '',
    });
  });

  it(`should parse '<\\ncam4\\ns\\n1\\n1\\n565A\\n噚358A㖊\\njing1 cam4\\ns 2 又\\n565A\\n噚'`, function () {
    const result = parseCharacter('<\ncam4\ns\n1\n1\n565A\n噚358A㖊\njing1 cam4\ns 2 又\n565A\n噚');

    expect(result).to.deep.equal({
      character: {
        type: ['<'],
        rg: 1,
        ucs2: '358A',
        ch: '㖊',
        infoArray: [
          {
            jyutping: ['cam4'],
            en: 's',
            pn: 1,
            ref: [
              {
                ucs2: '565A',
                ch: '噚',
              },
            ],
          },
          {
            jyutping: ['jing1', 'cam4'],
            en: 's',
            pn: 2,
            cl: true,
            ref: [
              {
                ucs2: '565A',
                ch: '噚',
              },
            ],
          },
        ]
      },
      str: '',
    });
  });
});
