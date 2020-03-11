const { puzzleInput } = require('./aoc2019-5.data');
const { IntcodeComputer } = require('../intcode');

// Part 1
const computer = new IntcodeComputer(puzzleInput);
const output = computer.run();
console.log(output);

// Part 2
const computer2 = new IntcodeComputer(puzzleInput, 5);
const output2 = computer2.run();
console.log(output2);
