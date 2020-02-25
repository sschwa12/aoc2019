const _ = require('lodash');
const { wireOne, wireTwo } = require('./aoc2019-3.data');

// Part 1
const getPath = (wire) => {
  const coords = {};
  let x = 0;
  let y = 0;
  let numSteps = 0;
  _.each(wire, (move) => {
    const [direction, numMoves] = [_.head(move), _.toNumber(_.join(_.tail(move), ''))];
    for (let index = 0; index < numMoves; index += 1) {
      if (direction === 'R') {
        x += 1;
      }
      if (direction === 'D') {
        y -= 1;
      }
      if (direction === 'L') {
        x -= 1;
      }
      if (direction === 'U') {
        y += 1;
      }
      numSteps += 1;
      _.set(coords, `${[x, y]}`, numSteps);
    }
  });
  return coords;
};

const getClosestCrossingPoint = (wire1, wire2) => {
  const wireOnePath = getPath(wire1);
  const wireTwoPath = getPath(wire2);
  const crossingPoints = _.pickBy(wireOnePath, (w1v, w1k) => _.has(wireTwoPath, w1k));

  // part 1 solution
  const crossingPointSums = _(crossingPoints)
    .keys()
    .map(k => _.split(k, ','))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .value();
  console.log(_.min(crossingPointSums));

  // part 2 solution
  const solution = _.min(_.map(crossingPoints, (v, k) => wireOnePath[k] + wireTwoPath[k]));
  console.log(solution);
};

getClosestCrossingPoint(wireOne, wireTwo);
