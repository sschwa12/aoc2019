const { each, head, tail, join, toNumber, intersectionBy, toString, min, sum, map, cond } = require('lodash');
const { wireOne, wireTwo } = require('./aoc2019-3.data');

// Part 1
const getPath = (wire) => {
  const coords = [];
  let x = 0;
  let y = 0;
  each(wire, (move) => {
    const [direction, numMoves] = [head(move), toNumber(join(tail(move), ''))];
    for (let index = 0; index < numMoves; index += 1) {
      coords.push([x, y]);
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
    }
  });
  return coords;
};

const getClosestCrossingPoint = (wire1, wire2) => {
  const wireOnePath = getPath(wire1);
  const wireTwoPath = getPath(wire2);

  const crossingPoints = intersectionBy(wireOnePath, wireTwoPath, (x) => toString(x));
  return min(map(tail(crossingPoints), ([x, y]) => sum([Math.abs(x), Math.abs(y)])));
};

const solution = getClosestCrossingPoint(wireOne, wireTwo);
console.log(solution);
