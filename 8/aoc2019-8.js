const _ = require('lodash');
const { puzzleInput } = require('./aoc2019-8.data');

const getLayers = (w, h, data) => {
  const layerSize = data.length / (data.length / (w * h));
  return _.chunk(data, layerSize);
};

// Part 1
const getImage = (w, h, data) => {
  let lowestZeroRow;
  let lowestZeroCount = Number.MAX_SAFE_INTEGER;
  const layers = getLayers(w, h, data);
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

// 2159
const solution = getImage(25, 6, puzzleInput);
console.log(solution);

// Part 2
const getPixel = (col) => {
  for (let index = 0; index < col.length; index += 1) {
    const px = col[index];
    if (px === '0' || px === '1') {
      return px;
    }
  }
};

const decodeImage = (w, h, data) => {
  const layers = getLayers(w, h, data);
  _(_.zip(...layers))
    .map(getPixel)
    .chunk(w)
    .each((ln) => console.log(_.join(ln, ',')));
};

// CJZHR
decodeImage(25, 6, puzzleInput);
