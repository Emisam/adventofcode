const fs = require("fs");
// Write a message to the console.

let data = fs.readFileSync("input\\day1.txt", "utf-8");

const dataRows = data.split(/\r\n\r\n/);

const allElfs = dataRows.map((row) => {
  const rowElements = row.split(/\r?\n/);
  return rowElements.reduce((acc, row) => acc + parseInt(row), 0);
});

allElfs.sort((a, b) => b - a);
console.log(allElfs[0]);
console.log(allElfs[0] + allElfs[1] + allElfs[2]);
