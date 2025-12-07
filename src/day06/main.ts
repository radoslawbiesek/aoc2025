import { readInput } from "../utils.ts";

const MULTIPLY = "*";
const ADD = "+";

function calculate(operator: string, numbers: string[]) {
  const filteredNumbers = numbers.filter((v) => !!v.trim());
  switch (operator) {
    case ADD:
      return filteredNumbers.reduce((acc, num) => {
        acc += +num;

        return acc;
      }, 0);
    case MULTIPLY:
      return filteredNumbers.reduce((acc, num) => {
        acc *= +num;

        return acc;
      }, 1);
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}

export function part1(filename: string): number {
  const lines = readInput(filename);
  const grid = lines.map((line) => line.split(" ").filter((v) => !!v));
  const cols = grid[0].length;
  const rows = grid.length;

  let total = 0;
  for (let colIdx = 0; colIdx <= cols - 1; colIdx++) {
    let numbers: string[] = [];
    for (let rowIdx = 0; rowIdx <= rows - 1; rowIdx++) {
      const current = grid[rowIdx][colIdx];
      if (rowIdx === rows - 1) {
        total += calculate(current, numbers);
        numbers = [];
      } else {
        numbers.push(current);
      }
    }
  }

  return total;
}

export function part2(filename: string): number {
  const lines = readInput(filename);
  const cols = lines[0].length;
  const rows = lines.length;

  let total = 0;
  let numbers: string[] = [];
  for (let colIdx = cols - 1; colIdx >= 0; colIdx--) {
    let number = "";
    for (let rowIdx = 0; rowIdx <= rows - 1; rowIdx++) {
      const current = lines[rowIdx][colIdx];

      if (current === ADD || current === MULTIPLY) {
        numbers.push(number);
        total += calculate(current, numbers);
        numbers = [];
        number = "";
        break;
      }

      number += lines[rowIdx][colIdx];
    }
    if (number) {
      numbers.push(number);
    }
  }

  return total;
}
