const fs = require("fs");
const data = fs.readFileSync("input\\day11.txt", "utf-8").split(/\r?\n/);

const monkeys = [];

let monkey = {};
let modulo = 1;
data.forEach((row) => {
  if (row.startsWith("  Starting items: ")) {
    let parsedRow = row.replace("  Starting items: ", "");
    parsedRow = parsedRow.split(", ").map((v) => parseInt(v));
    monkey.items = parsedRow;
  } else if (row.startsWith("  Operation: new = old ")) {
    let parsedRow = row.replace("  Operation: new = old ", "");
    parsedRow = parsedRow.replace(" ", "");
    monkey.operation = parsedRow;
  } else if (row.startsWith("  Test: divisible by ")) {
    let parsedRow = row.replace("  Test: divisible by ", "");
    monkey.testCondition = parseInt(parsedRow);
    modulo *= monkey.testCondition;
  } else if (row.startsWith("    If true: throw to monkey ")) {
    let parsedRow = row.replace("    If true: throw to monkey ", "");
    monkey.ifTrue = parseInt(parsedRow);
  } else if (row.startsWith("    If false: throw to monkey ")) {
    let parsedRow = row.replace("    If false: throw to monkey ", "");
    monkey.ifFalse = parseInt(parsedRow);
    monkey.inspectedItems = 0;
    monkeys.push(monkey);
    monkey = {};
  }
});

function evaluateItem(item, expression) {
  if (expression.startsWith("+")) {
    return item + parseInt(expression.slice(1));
  } else if (expression.startsWith("*old")) {
    return item * item;
  } else if (expression.startsWith("*")) {
    return item * parseInt(expression.slice(1));
  }
}

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      let newItemWorry = evaluateItem(item, monkey.operation);
      // snewItemWorry = Math.floor(newItemWorry / 3);
      newItemWorry %= modulo;
      if (newItemWorry % monkey.testCondition === 0) {
        monkeys[monkey.ifTrue].items.push(newItemWorry);
      } else {
        monkeys[monkey.ifFalse].items.push(newItemWorry);
      }
      monkey.inspectedItems++;
    });
    monkey.items = [];
  });
}

const monkeyInspects = monkeys.map((monkey) => monkey.inspectedItems);
monkeyInspects.sort((a, b) => b - a);

console.log(monkeyInspects[0] * monkeyInspects[1]);
