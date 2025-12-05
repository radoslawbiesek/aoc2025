import { EOL } from "node:os";
import { readInput } from "../utils.ts";

type Range = [start: number, end: number];

function parseInput(filename: string) {
  const [rangesStrs, idsStrs] = readInput(filename, EOL.repeat(2));

  const ranges = rangesStrs
    .split(EOL)
    .map((r) => r.split("-").map(Number) as Range);

  mergeRanges(ranges);

  const ids = idsStrs.split(EOL).map(Number);

  return [ranges, ids] as const;
}

function mergeRanges(ranges: Range[]): void {
  ranges.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i <= ranges.length - 2; i++) {
    const current = ranges[i];
    const next = ranges[i + 1];

    if (current[1] >= next[0]) {
      const newRange: Range = [current[0], Math.max(next[1], current[1])];
      ranges.splice(i, 2, newRange);
      if (i > 0) {
        i--;
      }
    }
  }
}

export function part1(filename: string) {
  const [ranges, ids] = parseInput(filename);
  let total = 0;

  for (const id of ids) {
    for (const [start, end] of ranges) {
      if (id >= start && id <= end) {
        total++;
        break;
      }
    }
  }

  return total;
}

export function part2(filename: string) {
  const [ranges] = parseInput(filename);
  let total = 0;

  for (const [start, end] of ranges) {
    total += end - start + 1;
  }

  return total;
}
