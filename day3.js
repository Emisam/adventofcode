const fs = require("fs");

const data = fs.readFileSync("input\\day3.txt", "utf-8");

// const data = fs.readFileSync("examples\\day3.txt", "utf-8");

const dataRows = data.split(/\r?\n/);

function calculateCharNumber(char) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt(0) - 38;
  } else {
    return char.charCodeAt(0) - 96;
  }
}

function part1(row) {
  const firstHalf = row.slice(0, row.length / 2);
  const secondHalf = row.slice(row.length / 2, row.length);
  for (let l of firstHalf) {
    if (secondHalf.includes(l)) {
      return calculateCharNumber(l);
    }
  }
}

function getBadge(rows) {
  for (let l of rows[0]) {
    if (rows[1].includes(l) && rows[2].includes(l)) {
      return calculateCharNumber(l);
    }
  }
}

function part2(rows) {
  const badgeNumbers = [];
  for (var i = 0; i < rows.length; i += 3) {
    badgeNumbers.push(getBadge(rows.slice(i, i + 3)));
  }
  return badgeNumbers.reduce((acc, badge) => acc + badge, 0);
}

const result = dataRows.reduce((acc, row) => acc + part1(row), 0);
console.log(result);

console.log(part2(dataRows));
