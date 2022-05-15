export const QUESTIONS: Array<any> = [
  {
    question: `[] == ![];`,
    answer: `true`,
  },
  {
    question: `"foo" + + "bar"`,
    answer: `'fooNaN'`,
  },
  {
    question: `typeof NaN;`,
    answer: `'number'`,
  },
  {
    question: `"foo" + + "bar"`,
    answer: `'fooNaN'`,
  },
  {
    question: `[1, 2, 3] + [4, 5, 6];`,
    answer: `'1,2,34,5,6'`,
  },
  {
    question: `0.1 + 0.2;`,
    answer: `'0.30000000000000004'`,
  },
  {
    question: `0.1 + 0.2 === 0.3;`,
    answer: `false`,
  },
  {
    question: `true + true;
    (true + true) * (true + true) - true;`,
    answer: `true + true; // -> 2
    (true + true) * (true + true) - true; // -> 3`,
  },
  {
    question: `1 < 2 < 3;`,
    answer: `true`,
  },
  {
    question: `3 > 2 > 1;`,
    answer: `false`,
  },
  {
    question: `
    (() => {
      try {
        return 2;
      } finally {
        return 3;
      }
    })();`,
    answer: `3`,
  },
  {
    question: `
    (function() {
      return
      {
        b: 10;xxxxxxx
      }
    })();`,
    answer: `undefined`,
  },
  {
    question: `Math.min() > Math.max();`,
    answer: `true`,
  },
  {
    question: `Math.min() < Math.max();`,
    answer: `false`,
  },
  {
    question: `[10, 1, 3].sort();`,
    answer: `[ 1, 10, 3 ]`,
  },
  {
    question: `setTimeout(() => console.log("called"), Infinity);`,
    answer: `'called'`,
  },
  {
    question: `
    27.toString();
    `,
    answer: `'called'`,
  },
  {
    question: `
    27.toString();
    `,
    answer: `27..toString();`,
  },

  {
    question: `![] + [];`,
    answer: `'false'`,
  },
  {
    question: `
    (![] + [])[+[]] +
    (![] + [])[+!+[]] +
    ([![]] + [][[]])[+!+[] + [+[]]] +
    (![] + [])[!+[] + !+[]];`,
    answer: `'fail'`,
  },
];
