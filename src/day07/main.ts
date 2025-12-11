import { Grid } from "../grid.ts";
import { readInput } from "../utils.ts";

const START = "S";
const BEAM = "|";
const SPLITTER = "^";
const EMPTY = ".";

type Position = Parameters<Grid["get"]>[0];

function dfs1(grid: Grid, currentPosition: Position): number {
  const currentValue = grid.get(currentPosition);

  if (currentValue === SPLITTER) {
    const left = grid.moveW(currentPosition)!;
    const right = grid.moveE(currentPosition)!;

    return dfs1(grid, left) + dfs1(grid, right);
  }

  if (currentValue === EMPTY) {
    grid.set(currentPosition, BEAM);
    const down = grid.moveS(currentPosition);
    if (down) {
      return dfs1(grid, down);
    }
  }

  return 1;
}

export function part1(filename: string): number {
  const input = readInput(filename);
  const grid = new Grid(input);

  const start = grid.findOne(START)!;
  const next = grid.moveS(start)!;

  return dfs1(grid, next) - 1;
}

function dfs2(
  grid: Grid,
  currentPosition: Position,
  cache: Map<string, number>
): number {
  const currentValue = grid.get(currentPosition);

  if (currentValue === SPLITTER) {
    const splitterKey = `${currentPosition.x}-${currentPosition.y}`;
    const cached = cache.get(splitterKey);
    if (cached) {
      return cached;
    }

    const left = grid.moveW(currentPosition)!;
    const right = grid.moveE(currentPosition)!;

    const result = dfs2(grid, left, cache) + dfs2(grid, right, cache);
    cache.set(splitterKey, result);

    return result;
  }

  let down = grid.moveS(currentPosition);
  if (down) {
    return dfs2(grid, down, cache);
  }

  return 1;
}

export function part2(filename: string): number {
  const input = readInput(filename);
  const grid = new Grid(input);

  const cache = new Map<string, number>();
  const start = grid.findOne(START)!;

  return dfs2(grid, start, cache);
}
