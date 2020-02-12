const _ = require('lodash');
const { input } = require('./input');

// Part 1

/*
  create the map, ie:
  { C: 'B',
  D: 'C',
  E: 'D',
  F: 'E',
  B: 'COM',
  G: 'B',
  H: 'G',
  I: 'D',
  J: 'E',
  K: 'J',
  L: 'K' }
*/
const getPlanetMap = (inputArr) => _(inputArr)
  .map((s) => _.reverse(_.split(s, ')')))
  .fromPairs()
  .value();

const planetMap = getPlanetMap(input);

const recur = (orbits, name) => {
  if (orbits[name]) {
    return 1 + recur(orbits, orbits[name]);
  }
  return 0;
};

const numOrbitsPerRecursion = _(planetMap)
  .keys(planetMap)
  .map((name) => recur(planetMap, name))
  .value();

// sum it all up
const solutionPart1 = _.reduce(numOrbitsPerRecursion, (prev, cur) => prev + cur);

console.log('part 1 solution:');
console.log(solutionPart1);

// Part 2

const getChain = (orbits, name) => {
  if (orbits[name]) {
    return `${name},${getChain(orbits, orbits[name])}`;
  }
  return name;
};

// get each orbit path, find where they intersect, count the length of that path (-2 for YOU and SAN)
const youChain = getChain(planetMap, 'YOU').split(',');
const sanChain = getChain(planetMap, 'SAN').split(',');
const intersection = _.intersection(youChain, sanChain);
const spliceFromYou = _.indexOf(youChain, intersection[0]);
const spliceFromSan = _.indexOf(sanChain, intersection[0]);
youChain.splice(spliceFromYou);
sanChain.splice(spliceFromSan);

const solutionPart2 = youChain.length + sanChain.length - 2;
console.log('part 2 solution:');
console.log(solutionPart2);
