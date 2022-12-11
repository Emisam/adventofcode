const fs = require("fs");
const data = fs.readFileSync("input\\day10.txt", "utf-8").split(/\r?\n/);

const example = ["noop", "addx 3", "addx -5"];

let cycle = 1;
let x = 1;

let cycleValues = ["-", 1];

data.forEach((instruction) => {
  if (instruction === "noop") {
    cycle++;
    cycleValues[cycle] = x;
  } else {
    cycle++;
    cycleValues[cycle] = x;

    x = x + parseInt(instruction.split(" ")[1]);
    cycle++;
    cycleValues[cycle] = x;
  }
});

console.log(
  cycleValues[20] * 20 +
    cycleValues[60] * 60 +
    cycleValues[100] * 100 +
    cycleValues[140] * 140 +
    cycleValues[180] * 180 +
    cycleValues[220] * 220
);
cycleValues.shift();
let crt = "";
for (let i = 0; i < cycleValues.length; i++) {
  if (i % 40 >= cycleValues[i] - 1 && i % 40 <= cycleValues[i] + 1) {
    crt = crt + "#";
  } else {
    crt = crt + ".";
  }
}
console.log(crt.slice(0, 40));
console.log(crt.slice(40, 80));
console.log(crt.slice(80, 120));
console.log(crt.slice(120, 160));
console.log(crt.slice(160, 200));
console.log(crt.slice(200, 240));
