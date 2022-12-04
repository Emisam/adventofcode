const fs = require("fs");

let data = fs.readFileSync("input\\day4.txt", "utf-8");

const dataRows = data.split(/\r?\n/);

function totalOverlap(firstElf, secondElf) {
  if (firstElf[0] >= secondElf[0] && firstElf[1] <= secondElf[1]) {
    return true;
  } else {
    return false;
  }
}

function semiOverlap(firstElf, secondElf) {
  if (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) {
    return true;
  } else if (firstElf[1] >= secondElf[0] && firstElf[1] <= secondElf[1]) {
    return true;
  } else {
    return false;
  }
}

const part1 = dataRows.reduce((acc, row) => {
  const values = row.split(/[,-]+/).map((v) => parseInt(v));
  const firstElf = [values[0], values[1]];
  const secondElf = [values[2], values[3]];
  if (totalOverlap(firstElf, secondElf) || totalOverlap(secondElf, firstElf)) {
    return acc + 1;
  } else {
    return acc + 0;
  }
}, 0);

const part2 = dataRows.reduce((acc, row) => {
  const values = row.split(/[,-]+/).map((v) => parseInt(v));
  const firstElf = [values[0], values[1]];
  const secondElf = [values[2], values[3]];
  if (semiOverlap(firstElf, secondElf) || semiOverlap(secondElf, firstElf)) {
    return acc + 1;
  } else {
    return acc + 0;
  }
}, 0);

console.log(part1);
console.log(part2);
