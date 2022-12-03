const fs = require("fs");
// Write a message to the console.
let data;
try {
  data = fs.readFileSync("input\\day2.txt", "utf-8");
  // data = fs.readFileSync("examples\\day2.txt", "utf-8");
} catch (err) {
  console.error(err);
}

const rock = "Rock";
const paper = "Paper";
const scissor = "Scissor";
const dataRows = data.split(/\r?\n/);

const shapeScores = { Rock: 1, Paper: 2, Scissor: 3 };
const conditionScores = { X: 0, Y: 3, Z: 6 };
const letterToShape = {
  A: "Rock",
  B: "Paper",
  C: "Scissor",
  X: "Rock",
  Y: "Paper",
  Z: "Scissor",
};

const winShapes = { Rock: "Paper", Paper: "Scissor", Scissor: "Rock" };
const loseShapes = { Rock: "Scissor", Paper: "Rock", Scissor: "Paper" };

//X: Rock,  Y: Paper, Z: Scissor

function decideShape(opponent, condition) {
  //draw
  if (condition == "Y") {
    return opponent;
  } else if (condition == "X") {
    return loseShapes[opponent];
  } else {
    return winShapes[opponent];
  }
}

function win(p1, p2) {
  if (p1 == p2) {
    return 3;
  } else if (p1 == rock) {
    if (p2 == paper) {
      return 6;
    } else if (p2 == scissor) {
      return 0;
    }
  } else if (p1 == paper) {
    if (p2 == scissor) {
      return 6;
    } else if (p2 == rock) {
      return 0;
    }
  } else if (p1 == scissor) {
    if (p2 == rock) {
      return 6;
    } else if (p2 == paper) {
      return 0;
    }
  }
}

function getPart1(row) {
  const actions = row.split(/\s/);
  const p1 = letterToShape[actions[0]];
  const p2 = letterToShape[actions[1]];
  return shapeScores[p2] + win(p1, p2);
}

function getPart2(row) {
  const actions = row.split(/\s/);
  const condition = actions[1];
  const p1 = letterToShape[actions[0]];
  const p2 = decideShape(p1, condition);
  return shapeScores[p2] + conditionScores[condition];
}

console.log(dataRows);
const part1 = dataRows.reduce((acc, row) => acc + getPart1(row), 0);

const part2 = dataRows.reduce((acc, row) => acc + getPart2(row), 0);
//X: lose, Y: win, Z: draw

console.log(part1);

console.log(part2);
