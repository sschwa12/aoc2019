const combinations = (str) => {
  const recur = (active, rest, a) => {
    if (!active && !rest) {
      return;
    }
    if (!rest) {
      a.push(active);
    } else {
      recur(active + rest[0], rest.slice(1), a);
      recur(active, rest.slice(1), a);
    }
    return a;
  };
  return recur('', str, []);
};


const permutations = (input) => {
  const permArr = [];
  const usedChars = [];
  const recur = () => {
    let ch;
    for (let i = 0; i < input.length; i += 1) {
      // eslint-disable-next-line prefer-destructuring
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      recur(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  };
  return recur();
};


module.exports = { combinations, permutations };
