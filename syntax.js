const readline = require('readline');

function reject() {
  console.log('String is invalid');
  process.exit(0); // Terminate the program
}

function isAValid() {
  if (s[i] === 'a') {
    i++;
    if (s[i] === 'b') {
      i++;
    } else {
      reject();
    }
    return true;
  }
  reject();
}

function isCValid() {
  if (s[i] === 'c') {
    i++;
    isCValid();
  }
}

function isDValid() {
  if (s[i] === 'd') {
    i++;
    isDValid();
  }
}

function displayValid() {
  console.log('String is valid');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let s;
let i;

console.log('Grammar Rules:');
console.log('S -> cAd');
console.log('A -> ab | a');
console.log('C -> cC | ε');
console.log('D -> dD | ε');
console.log('Enter the String:');

rl.on('line', (input) => {
  s = input;
  i = 0;

  // Check if the string follows the grammar rules
  try {
    if (s[i++] === 'c' && isAValid() && isCValid() && s[i++] === 'd' && isDValid() && i === s.length) {
          reject();
    }
    displayValid();
  } catch (error) {
    reject();
  }

  rl.close();
});
