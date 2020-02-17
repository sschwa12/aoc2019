const _ = require('lodash');
const { puzzleInput } = require('./aoc2019-8.data');

const decodeImage = (w, h, data) => {
  const layerSize = data.length / (data.length / (w * h));
  const layers = _.chunk(data, layerSize);
  let lowestZeroRow;
  let lowestZeroCount = Number.MAX_SAFE_INTEGER;
  _.each(layers, (l) => {
    let zeroCount = 0;
    _.each(l, (num) => {
      if (num === '0') {
        zeroCount += 1;
      }
    });
    if (zeroCount < lowestZeroCount) {
      lowestZeroCount = zeroCount;
      lowestZeroRow = l;
    }
  });
  const groups = _.groupBy(lowestZeroRow);
  return groups[1].length * groups[2].length;
};

const solution = decodeImage(25, 6, puzzleInput);
console.log(solution);
