const fs = require("fs");

const data = fs.readFileSync("input\\day7.txt", "utf-8").replace(/\r\n/g, " ");

const dataRows = data.split("$").map((row) => row.trim());

const directories = {};

function changeDirectory(command) {
  let parsedCommand = command.replace("cd ", "");
  return parsedCommand.trim() + "/";
}

function listDirectory(command, path) {
  const parsedCommand = command.replace("ls ", "");
  const files = parsedCommand.split(" ");
  const dir = {};
  for (let i = 0; i < files.length; i = i + 2) {
    let value = files[i + 1];
    const size = files[i];
    if (size === "dir") {
      value = path + value + "/";
    }
    dir[value] = size;
  }
  return dir;
}

let currentDir = "";

dataRows.forEach((row) => {
  if (row.startsWith("cd /")) {
    currentDir = "/";
  } else if (row.startsWith("cd ..")) {
    dirArray = currentDir.split("/");
    dirArray.pop();
    dirArray.pop();
    currentDir = dirArray.join("/") + "/";
  } else if (row.startsWith("cd")) {
    currentDir = currentDir + changeDirectory(row);
  } else if (row.startsWith("ls")) {
    directories[currentDir] = listDirectory(row, currentDir);
  }
});

function getDirectorySize(directory) {
  let dirSize = Object.keys(directory).reduce((acc, file) => {
    if (directory[file] === "dir") {
      return acc + getDirectorySize(directories[file]);
    } else {
      return acc + parseInt(directory[file]);
    }
  }, 0);
  return dirSize;
}

const dirSizes = [];

Object.keys(directories).forEach((dir) => {
  const dirSize = getDirectorySize(directories[dir]);
  dirSizes.push([dir, dirSize]);
});

//Part 1
const list = dirSizes.filter((dir) => {
  return dir[1] <= 100000;
});
console.log(list.reduce((acc, v) => acc + v[1], 0));

//Part 2
dirSizes.sort((a, b) => a[1] - b[1]);

const usedSpace = dirSizes[dirSizes.length - 1][1];
const freeSpace = 70000000 - usedSpace;
const candidates = dirSizes.filter((dir) => {
  return freeSpace + dir[1] > 30000000;
});

console.log(candidates[0][1]);
