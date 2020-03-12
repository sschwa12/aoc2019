const _ = require('lodash');
const { puzzleInput } = require('./aoc2019-7.data.js');
const { permutations } = require('../utils');
const { IntcodeComputer } = require('../intcode');

const { each, some, map, isEmpty } = _;

const NORMAL_MODE = 'normal';
const FEEDBACK_LOOP_MODE = 'feedbackLoop';

const MODES = {
  [NORMAL_MODE]: { phaseSettings: permutations([0, 1, 2, 3, 4]) },
  [FEEDBACK_LOOP_MODE]: { phaseSettings: permutations([5, 6, 7, 8, 9]) },
};

const createOrReturnComputer = (input, phaseSetting, ampNumber, outputSignal, computers) => {
  const computer = computers[ampNumber];
  if (computer) {
    computer.input = [outputSignal];
    return computer;
  }
  return new IntcodeComputer(input, [phaseSetting[ampNumber], outputSignal]);
};

const runAmplifiers = (input, phaseSetting) => {
  let numAmplifiers = 0;
  let outputSignal = 0;
  const computers = {};
  while (isEmpty(computers) || some(map(computers, 'halted'), isHalted => !isHalted)) {
    while (numAmplifiers < 5) {
      computers[numAmplifiers] = createOrReturnComputer(input, phaseSetting, numAmplifiers, outputSignal, computers);
      const output = computers[numAmplifiers].run();
      if (output !== null) {
        outputSignal = output;
      }
      numAmplifiers += 1;
    }
    numAmplifiers = 0;
  }
  return outputSignal;
};

const getMaxOutputSignal = mode => {
  let maxOutput = Number.MIN_SAFE_INTEGER;
  each(MODES[mode].phaseSettings, ps => {
    const outputSignal = runAmplifiers(puzzleInput, ps);
    if (outputSignal > maxOutput) {
      maxOutput = outputSignal;
    }
  });
  return maxOutput;
};

const p1 = getMaxOutputSignal(NORMAL_MODE);
console.log(p1);

const p2 = getMaxOutputSignal(FEEDBACK_LOOP_MODE);
console.log(p2);
