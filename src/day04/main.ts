import { readInput } from "../utils.ts";
import { Grid } from "../grid.ts";

const ROLL = "@";
const EMPTY_SQUARE = ".";
const MAX_ADJACENT_ROLLS = 4;

export function part1(filename: string): number {
  const grid = new Grid(readInput(filename));
  let total = 0;

  for (const cell of grid) {
    const value = grid.get(cell);
    if (value === ROLL) {
      const otherRollsCount = grid
        .getNeighbors(cell)
        .filter((n) => n.value === ROLL).length;

      if (otherRollsCount < MAX_ADJACENT_ROLLS) {
        total++;
      }
    }
  }

  return total;
}

export function part2(filename: string): number {
  const grid = new Grid(readInput(filename));
  let total = 0;

  let lastRemoved = 0;
  do {
    lastRemoved = 0;

    for (const cell of grid) {
      const value = grid.get(cell);
      if (value === ROLL) {
        const otherRollsCount = grid
          .getNeighbors(cell)
          .filter((n) => n.value === ROLL).length;

        if (otherRollsCount < MAX_ADJACENT_ROLLS) {
          lastRemoved++;
          grid.set(cell, EMPTY_SQUARE);
        }
      }
    }

    total += lastRemoved;
  } while (lastRemoved > 0);

  return total;
}
