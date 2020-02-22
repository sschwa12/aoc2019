const { slice, add, multiply, map, toNumber } = require('lodash');
const { puzzleInput } = require('./aoc2019-2.data');

// Part 1
const fixComputer = (data, noun, verb) => {
  const input = map(data, toNumber);
  input[1] = noun;
  input[2] = verb;
  for (let index = 0; index < input.length; index += 4) {
    const opcode = input[index];
    const [operand1Loc, operand2Loc, newLoc] = slice(input, index + 1, index + 4);
    const operand1 = input[operand1Loc];
    const operand2 = input[operand2Loc];
    let result;
    if (opcode === 99) {
      break;
    }
    if (opcode === 1) {
      result = add(operand1, operand2);
    } else if (opcode === 2) {
      result = multiply(operand1, operand2);
    }
    input[newLoc] = result;
  }
  return input[0];
};

console.log(fixComputer(puzzleInput, 12, 2));

// Part 2
const findOutput = (input) => {
  const expectedOutput = 19690720;
  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 100; j += 1) {
      const output = fixComputer(input, j, i);
      if (output === expectedOutput) {
        return 100 * j + i;
      }
    }
  }
};

console.log(findOutput(puzzleInput));
