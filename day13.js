const fs = require("fs");
const data = fs.readFileSync("input\\day13.txt", "utf-8").split(/\n\r\n/);

function compareNumber(left, right) {
  if (parseInt(left) < parseInt(right)) {
    return true;
  } else if (parseInt(left) > parseInt(right)) {
    return false;
  }
  return "continue";
}

function convertTolist(nr) {
  if (typeof nr === "object") {
    return nr;
  } else {
    return [nr];
  }
}

function comparePair(left, right) {
  for (let i = 0; i < left.length; i++) {
    if (i === right.length) {
      return false;
    }
    if (typeof left[i] === "number" && typeof right[i] === "number") {
      const comparedNumbers = compareNumber(left[i], right[i]);
      if (typeof comparedNumbers === "boolean") {
        return comparedNumbers;
      }
    } else {
      const first = convertTolist(left[i]);
      const second = convertTolist(right[i]);
      const comparedList = comparePair(first, second);
      if (typeof comparedList === "boolean") {
        return comparedList;
      }
    }
  }
  if (left.length < right.length) {
    return true;
  }
  return "continue";
}
const list = [];
let sumOfIndices = 0;
for (let i = 0; i < data.length; i++) {
  const splittedPair = data[i].split(/\r\n/);
  const first = eval(splittedPair[0]);
  const second = eval(splittedPair[1]);
  list.push(first);
  list.push(second);
  const result = comparePair(first, second);

  if (result === true || result === "continue") {
    sumOfIndices = sumOfIndices + i + 1;
  }
}
console.log("Part 1:", sumOfIndices);
list.push([[2]]);
list.push([[6]]);
list.sort((a, b) => {
  const result = comparePair(a, b);
  if (result === true || result === "continue") {
    return -1;
  }
  return 1;
});

const newlist = list.map((a) => a.toString());

console.log("Part 2:", (newlist.indexOf("2") + 1) * (newlist.indexOf("6") + 1));
