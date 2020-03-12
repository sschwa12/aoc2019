const { add, multiply, map, toNumber, slice, chunk, join, toString, lt } = require('lodash');

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';

const ADD = '01';
const MULTIPLY = '02';
const INPUT = '03';
const OUTPUT = '04';
const JUMP_IF_TRUE = '05';
const JUMP_IF_FALSE = '06';
const LESS_THAN = '07';
const EQUALS = '08';
const HALT = '99';

const fillZeros = (num) => {
  let str = toString(num);
  while (str.length < 5) {
    str = `0${str}`;
  }
  return str;
};

class IntcodeComputer {
  constructor(data, input) {
    this.data = map(data, toNumber);
    this.halted = false;
    this.pc = 0;
    this.output = null;
    this.input = input || [1];
  }

  getValue(mode, val) {
    return toString(mode) === POSITION_MODE ? this.data[val] : val;
  }

  execute() {
    const instruction = fillZeros(this.data[this.pc]);
    const [modes, opcode] = chunk(instruction, 3);
    switch (join(opcode, '')) {
      case ADD: {
        const [val1, val2, newLoc] = slice(this.data, this.pc + 1, this.pc + 4);
        const val1Mode = modes[2];
        const val2Mode = modes[1];
        const sum = add(this.getValue(val1Mode, val1), this.getValue(val2Mode, val2));
        this.data[newLoc] = sum;
        this.pc += 4;
        break;
      }
      case MULTIPLY: {
        const [val1, val2, newLoc] = slice(this.data, this.pc + 1, this.pc + 4);
        const val1Mode = modes[2];
        const val2Mode = modes[1];
        this.data[newLoc] = multiply(this.getValue(val1Mode, val1), this.getValue(val2Mode, val2));
        this.pc += 4;
        break;
      }
      case INPUT: {
        const [newLoc] = slice(this.data, this.pc + 1, this.pc + 2);
        this.data[newLoc] = this.input.shift();
        this.pc += 2;
        break;
      }
      case OUTPUT: {
        // this.output = null;
        const [val] = slice(this.data, this.pc + 1, this.pc + 2);
        const mode = modes[2];
        this.output = this.getValue(mode, val);
        this.pc += 2;
        return this.output;
        // break;
      }
      case JUMP_IF_TRUE: {
        const [p1, p2] = slice(this.data, this.pc + 1, this.pc + 3);
        if (this.getValue(modes[2], p1) !== 0) {
          this.pc = this.getValue(modes[1], p2);
        } else {
          this.pc += 3;
        }
        break;
      }
      case JUMP_IF_FALSE: {
        const [p1, p2] = slice(this.data, this.pc + 1, this.pc + 3);
        if (this.getValue(modes[2], p1) === 0) {
          this.pc = this.getValue(modes[1], p2);
        } else {
          this.pc += 3;
        }
        break;
      }
      case LESS_THAN: {
        const [p1, p2, newLoc] = slice(this.data, this.pc + 1, this.pc + 4);
        const val1 = this.getValue(modes[2], p1);
        const val2 = this.getValue(modes[1], p2);
        this.data[newLoc] = lt(val1, val2) ? 1 : 0;
        this.pc += 4;
        break;
      }
      case EQUALS: {
        const [p1, p2, newLoc] = slice(this.data, this.pc + 1, this.pc + 4);
        const val1 = this.getValue(modes[2], p1);
        const val2 = this.getValue(modes[1], p2);
        this.data[newLoc] = val1 === val2 ? 1 : 0;
        this.pc += 4;
        break;
      }
      case HALT:
        this.halted = true;
        break;
      default:
        throw new Error('shouldnt get here');
    }
  }


  run() {
    this.output = null;
    while (!this.halted && this.output === null) {
      this.execute();
    }
    return this.output;
  }
}

module.exports = {
  IntcodeComputer,
};
