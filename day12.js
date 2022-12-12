const fs = require("fs");
const data = fs.readFileSync("input\\day12.txt", "utf-8").split(/\r?\n/);

const parsedData = data.map((row) => row.split(""));

function charCode(char) {
  if (char === "E") {
    return "z".charCodeAt(0) - 96;
  }
  if (char === "S") {
    return "a".charCodeAt(0) - 96;
  }
  return char.charCodeAt(0) - 96;
}

function findPosition(pos) {
  for (let i = 0; i < parsedData.length; i++) {
    for (let j = 0; j < parsedData[0].length; j++) {
      if (parsedData[i][j] === pos) {
        return [i, j];
      }
    }
  }
}

function findAllPositions(pos) {
  const positions = [];
  for (let i = 0; i < parsedData.length; i++) {
    for (let j = 0; j < parsedData[0].length; j++) {
      if (parsedData[i][j] === pos) {
        positions.push([i, j]);
      }
    }
  }
  return positions;
}

function validPosition(posX, posY) {
  return (
    posX >= 0 &&
    posY >= 0 &&
    posX < parsedData.length &&
    posY < parsedData[0].length
  );
}

const distanceMatrix = Array(parsedData.length)
  .fill("-")
  .map(() => Array(parsedData[0].length).fill("-"));
console.log(parsedData.length, distanceMatrix.length);
const end = findPosition("E");

const queue = [[...end, 0]];

while (queue.length > 0) {
  let currentPos = queue.shift();
  let x = currentPos[0];
  let y = currentPos[1];
  let counter = currentPos[2];
  let currentValue = charCode(parsedData[x][y]);
  const neighbours = [
    [x, y - 1, counter + 1],
    [x - 1, y, counter + 1],
    [x, y + 1, counter + 1],
    [x + 1, y, counter + 1],
  ];
  neighbours.forEach((pos) => {
    const posX = pos[0];
    const posY = pos[1];

    if (validPosition(posX, posY)) {
      let posValue = charCode(parsedData[posX][posY]);

      if (distanceMatrix[posX][posY] === "-") {
        if (currentValue <= posValue + 1) {
          distanceMatrix[posX][posY] = pos[2];
          queue.push(pos);
        }
      }
    }
  });
}

let allA = findAllPositions("a");
let distances = allA
  .map((a) => {
    return distanceMatrix[a[0]][a[1]];
  })
  .filter((a) => a !== "-");
distances.sort((a, b) => a - b);

console.log(distances[0]);
console.log(distanceMatrix[20][0]);
