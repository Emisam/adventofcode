const fs = require("fs");

const data = fs.readFileSync("input\\day8.txt", "utf-8").split(/\r?\n/);

// const dataRows = data.split("$").map((row) => row.trim());

const grid = data.map((row) => row.split(""));

function isEdge(x, y) {
  return (
    x === 0 || y === 0 || x === grid.length - 1 || y === grid[0].length - 1
  );
}

function checkVisability(trees, current) {
  let isVisable = true;
  trees.forEach((tree) => {
    if (parseInt(tree) >= current) {
      isVisable = false;
    }
  });
  return isVisable;
}

function checkNeighbours(x, y) {
  if (isEdge(x, y)) {
    return 1;
  }
  const left = grid[x].slice(0, y);
  const right = grid[x].slice(y + 1);
  const column = grid.map((row) => row[y]);
  const up = column.slice(0, x);
  const down = column.slice(x + 1);

  let currentHeight = parseInt(grid[x][y]);
  if (
    checkVisability(up, currentHeight) ||
    checkVisability(down, currentHeight) ||
    checkVisability(left, currentHeight) ||
    checkVisability(right, currentHeight)
  ) {
    return 1;
  }
  return 0;
}

function calculateDistance(trees, currentHeight) {
  let i = 0;
  let bool = true;
  if (trees.length == 0) {
    return i;
  }

  while (bool) {
    if (parseInt(trees[i]) >= currentHeight || i + 1 >= trees.length) {
      bool = false;
    }
    i++;
  }
  return i;
}

function calculateTotalDistance(x, y) {
  const currentHeight = parseInt(grid[x][y]);
  const left = grid[x].slice(0, y).reverse();

  const right = grid[x].slice(y + 1);
  const column = grid.map((row) => row[y]);
  const up = column.slice(0, x).reverse();
  const down = column.slice(x + 1);

  return (
    calculateDistance(left, currentHeight) *
    calculateDistance(right, currentHeight) *
    calculateDistance(up, currentHeight) *
    calculateDistance(down, currentHeight)
  );
}

let visableTrees = 0;
let maxDistance = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    visableTrees = visableTrees + checkNeighbours(x, y);
    const distance = calculateTotalDistance(x, y);
    if (distance >= maxDistance) {
      maxDistance = distance;
    }
  }
}
console.log(maxDistance);
console.log(visableTrees);
