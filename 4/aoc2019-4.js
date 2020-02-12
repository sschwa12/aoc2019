const _ = require('lodash');

// Brute force solution

// Part 1

// input: 153517-630395
const inputRange = _.range(153517, 630396);

const hasRepeated = (numArray) => {
  let cur = numArray[0];
  for (let index = 1; index < numArray.length; index += 1) {
    const element = numArray[index];
    if (element === cur) {
      return true;
    }
    cur = element;
  }
  return false;
};

const hasIncreasingDigits = (numArray) => {
  let max = numArray[0];
  for (let index = 1; index < numArray.length; index += 1) {
    const element = numArray[index];
    if (element < max) {
      return false;
    }
    max = element;
  }
  return true;
};

const getPasswords = (input, ...validators) => _.filter(input, (num) => {
  const numArray = _.map(_.split(num, ''), _.toNumber);
  return _.every(_.map(validators, (v) => v(numArray)));
});

const passwords = getPasswords(inputRange, hasRepeated, hasIncreasingDigits);
console.log(_.size(passwords));

// Part 2

const hasDouble = (numArray) => {
  const counts = {};
  _.each(numArray, (n) => {
    if (!counts[n]) {
      counts[n] = 1;
    } else {
      counts[n] += 1;
    }
  });
  return _.some(_.values(counts), (count) => count === 2);
};

const newPasswords = getPasswords(passwords, hasDouble);
console.log(_.size(newPasswords));
