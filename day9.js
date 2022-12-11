const fs = require("fs");
const data = fs.readFileSync("input\\day9.txt", "utf-8").split(/\r?\n/);

function moveTail(head, tail) {
  if (Math.abs(tail.X - head.X) >= 2 || Math.abs(tail.Y - head.Y) >= 2) {
    if (tail.X !== head.X && tail.Y !== head.Y) {
      if (tail.X > head.X && tail.Y > head.Y) {
        tail.X--;
        tail.Y--;
      } else if (tail.X > head.X && tail.Y < head.Y) {
        tail.X--;
        tail.Y++;
      } else if (tail.X < head.X && tail.Y > head.Y) {
        tail.X++;
        tail.Y--;
      } else if (tail.X < head.X && tail.Y < head.Y) {
        tail.X++;
        tail.Y++;
      }
    } else if (tail.X === head.X && tail.Y > head.Y) {
      tail.Y--;
    } else if (tail.X === head.X && tail.Y < head.Y) {
      tail.Y++;
    } else if (tail.X > head.X && tail.Y === head.Y) {
      tail.X--;
    } else if (tail.X < head.X && tail.Y === head.Y) {
      tail.X++;
    }
  }
}

function doMove(move, knots) {
  let moveset = move.split(" ");
  const head = knots[0];
  console.log(knots.length);
  for (let i = 0; i < parseInt(moveset[1]); i++) {
    switch (moveset[0]) {
      case "U": //Y+1
        head.Y++;
        break;
      case "D": //Y-1
        head.Y--;
        break;
      case "R": //x+1
        head.X++;
        break;
      case "L": //X-1
        head.X--;
        break;
    }

    for (let j = 0; j < knots.length - 1; j++) {
      moveTail(knots[j], knots[j + 1]);
    }
    const tail =
      "X" +
      String(knots[knots.length - 1].X) +
      "Y" +
      String(knots[knots.length - 1].Y);
    if (!visited.includes(tail)) {
      visited.push(tail);
    }
  }
}

let visited = [];
const part1 = [
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
];

const part2 = [
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
  { X: 0, Y: 0 },
];

data.forEach((move) => {
  doMove(move, part1);
});

console.log(visited.length);

visited = [];
data.forEach((move) => {
  doMove(move, part2);
});

console.log(visited.length);
