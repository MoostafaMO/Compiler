const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter equation: ', (equation) => {
  let identifier = 0;
  let number = 0;
  let operator = 0;
  let keyword = 0;
  let specialCharacter = 0;
  let comment = 0;

  const keywords = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends',
    'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var',
    'void', 'while', 'with', 'yield'
  ];

  let insideComment = false;

  for (let j = 0; j < equation.length; j++) {
    const ch = equation[j];

    if (ch === '/' && equation[j + 1] === '*') {
      insideComment = true;
      j++;
      comment++;
      continue;
    }

    if (ch === '*' && equation[j + 1] === '/') {
      insideComment = false;
      j++;
      comment++;
      continue;
    }

    if (ch === '/' && equation[j + 1] === '/') {
      comment++;
      break;
    }

    if (insideComment) {
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let currentToken = ch;
      let k = j + 1;

      while (k < equation.length && /[a-zA-Z]/.test(equation[k])) {
        currentToken += equation[k];
        k++;
      }

      if (keywords.includes(currentToken)) {
        console.log(`${currentToken} is a keyword.`);
        keyword++;
        j = k - 1;
      } else {
        console.log(`${currentToken} is an identifier.`);
        identifier++;
        j = k - 1;
      }
    } else if (/[0-9]/.test(ch) || (ch === '.' && /\d/.test(equation[j + 1]))) {
      let currentToken = ch;
      let k = j + 1;

      while (k < equation.length && /[0-9.]/.test(equation[k])) {
        currentToken += equation[k];
        k++;
      }

      console.log(`${currentToken} is a number.`);
      number++;
      j = k - 1;
    } else if (/[+\-*/]/.test(ch)) {
      console.log(`${ch} is an operator.`);
      operator++;
    } else if (/\s/.test(ch)) {
      continue;
    } else if (/[{}()]/.test(ch)) {
      console.log(`${ch} is a special character.`);
      specialCharacter++;
    } else if (/<|>/.test(ch)) {
      console.log(`${ch} is a comparison operator.`);
    } else if (/=/.test(ch)) {
      console.log(`${ch} is an assignment.`);
    } else if (/;/ .test(ch)) {
      console.log(`${ch} is semicolon.`);
    } else if (/&|^\~/.test(ch)) {
      console.log(`${ch} is a bitwise operator.`);
    } else {
      console.log(`${ch} is not recognized.`);
    }
  }

  rl.close();
});
