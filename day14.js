const fs = require("fs");
const data = fs.readFileSync("examples\\day14.txt", "utf-8").split(/\r?\n/);

const matrix = new Array(1000).fill(0).map(() => new Array(200).fill("."));

function drawLine(p1, p2) {
  if (p1[0] === p2[0]) {
    for (let i = Math.min(p2[1], p1[1]); i <= Math.max(p2[1], p1[1]); i++) {
      matrix[p1[0]][i] = "#";
    }
  } else {
    for (let i = Math.min(p1[0], p2[0]); i <= Math.max(p1[0], p2[0]); i++) {
      matrix[i][p1[1]] = "#";
    }
  }
}

data.forEach((line) => {
  const points = line
    .split(" -> ")
    .map((point) => point.split(",").map((cords) => parseInt(cords)));
  for (let i = 0; i < points.length - 1; i++) {
    drawLine(points[i], points[i + 1]);
  }
});

let yMax = matrix.reduce((acc, line) => {
  let currentMax = line.lastIndexOf("#");
  if (acc > currentMax) {
    return acc;
  } else {
    return currentMax;
  }
});
matrix.forEach((line) => (line.length = yMax + 2));

function checkNext(point) {
  let x = point[0];
  let y = point[1];
  if (matrix[x][y + 1] === ".") {
    return [x, y + 1];
  } else if (matrix[x - 1][y + 1] === ".") {
    return [x - 1, y + 1];
  } else if (matrix[x + 1][y + 1] === ".") {
    return [x + 1, y + 1];
  }
  return point;
}

let b = true;
while (b) {
  const startP = [500, 0];
  let c = true;
  let currentPoint = startP;
  while (c) {
    const nextPoint = [...checkNext(currentPoint)];
    if (currentPoint[0] === nextPoint[0] && currentPoint[1] === nextPoint[1]) {
      matrix[nextPoint[0]][nextPoint[1]] = "O";
      c = false;
    } else {
      currentPoint = [...nextPoint];
    }
  }
  if (matrix[500][0] == "O") {
    b = false;
  }
  matrix.forEach((line) => {
    if (line.includes("#")) {
      console.log(line.join(""));
    }
  });
}
console.log(
  matrix.reduce((acc, line) => acc + line.filter((v) => v === "O").length, 0)
);
