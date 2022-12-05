const fs = require("fs");

const arrayOfStacks1 = [
  "-",
  ["Z", "T", "F", "R", "W", "J", "G"],
  ["G", "W", "M"],
  ["J", "N", "H", "G"],
  ["J", "R", "C", "N", "W"],
  ["W", "F", "S", "B", "G", "Q", "V", "M"],
  ["S", "R", "T", "D", "V", "W", "C"],
  ["H", "B", "N", "C", "D", "Z", "G", "V"],
  ["S", "J", "N", "M", "G", "C"],
  ["G", "P", "N", "W", "C", "J", "D", "L"],
];

const arrayOfStacks2 = JSON.parse(JSON.stringify(arrayOfStacks1));

const data = fs.readFileSync("input\\day5.txt", "utf-8");

const dataRows = data.split(/\r?\n/);

const instructions = dataRows.map((row) => {
  return row
    .replace("move ", "")
    .replace(" from ", "-")
    .replace(" to ", "-")
    .split(/-/)
    .map((value) => parseInt(value));
});

//part 1
instructions.forEach((instruction) => {
  const times = instruction[0];
  const from = instruction[1];
  const to = instruction[2];
  for (let i = 0; i < times; i++) {
    if (arrayOfStacks1[from].length) {
      arrayOfStacks1[to].push(arrayOfStacks1[from].pop());
    }
  }
});

//part 2
instructions.forEach((instruction) => {
  const times = instruction[0];
  const from = instruction[1];
  const to = instruction[2];
  const boxesToMove = [];
  for (let i = 0; i < times; i++) {
    if (arrayOfStacks2[from].length) {
      boxesToMove.push(arrayOfStacks2[from].pop());
    }
  }
  while (boxesToMove.length > 0) {
    arrayOfStacks2[to].push(boxesToMove.pop());
  }
});

//part 1 result
arrayOfStacks1.shift();
console.log(arrayOfStacks1.map((stack) => stack.pop()).join(""));

//part 2 result
arrayOfStacks2.shift();
console.log(arrayOfStacks2.map((stack) => stack.pop()).join(""));
