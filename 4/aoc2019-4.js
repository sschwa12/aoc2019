const _ = require('lodash');

// Part 1
// input: 153517-630395
const inputRange = _.range(153517, 630396);

const hasRepeated = numArray => _.size(_.uniq(numArray)) !== _.size(numArray);

const hasIncreasingDigits = numArray => !!_.reduce(numArray, (prev, cur) => (
  (prev !== false) && (prev <= cur) ? cur : false
), -Infinity);

const getPasswords = (input, ...validators) => _.filter(input, num => {
  const numArray = _.map(_.split(num, ''), _.toNumber);
  return _.every(_.map(validators, v => v(numArray)));
});

const passwords = getPasswords(inputRange, hasRepeated, hasIncreasingDigits);
console.log(_.size(passwords));

// Part 2
const hasDouble = numArray => _(numArray)
  .countBy(num => num)
  .values()
  .thru(c => _.some(c, count => count === 2))
  .value();

const newPasswords = getPasswords(passwords, hasDouble);
console.log(_.size(newPasswords));
