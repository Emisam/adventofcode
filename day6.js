const fs = require("fs");

const data = fs.readFileSync("input\\day6.txt", "utf-8");

const examples = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

function isUnique(str) {
  return new Set(str).size == str.length;
}

function findStart(sequence, markerLength = 4) {
  for (let i = 0; i < sequence.length; i++) {
    if (isUnique(sequence.substring(i, i + markerLength))) {
      return i + markerLength;
    }
  }
}

examples.forEach((example) => console.log(findStart(example)));
console.log(findStart(data));
console.log(findStart(data, 14));
