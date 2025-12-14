import { EOL } from "node:os";

import { readInput } from "../utils.ts";
import { Grid, Position } from "../grid.ts";

const SHAPE = "#";
const EMPTY = ".";

class Present {
  readonly index: number;
  readonly grid: Grid;
  readonly area: number;

  constructor(index: number, grid: Grid) {
    this.index = index;
    this.grid = grid;
    this.area = this.grid.findAll(SHAPE).length;
  }
}

class Region {
  readonly grid: Grid;
  private readonly listedPresents: number[];
  private currentPresents: number[];

  constructor(grid: Grid, listedPresents: number[]) {
    this.grid = grid;
    this.listedPresents = listedPresents;
    this.currentPresents = Array(listedPresents.length).fill(0);
  }

  public canAddPresent(presentGrid: Grid, mountPosition: Position) {
    for (const position of presentGrid) {
      if (presentGrid.get(position) === EMPTY) {
        continue;
      }

      const currentValue = this.grid.get({
        x: mountPosition.x + position.x,
        y: mountPosition.y + position.y,
      });

      if (currentValue !== EMPTY) {
        return false;
      }
    }

    return true;
  }

  public addPresent(present: Present, mountPosition: Position) {
    this.setPresentFields(present.grid, mountPosition, SHAPE);
    this.currentPresents[present.index]++;
  }

  public removePresent(present: Present, mountPosition: Position) {
    this.setPresentFields(present.grid, mountPosition, EMPTY);
    this.currentPresents[present.index]--;
  }

  public isFilled() {
    return this.listedPresents.every(
      (value, index) => this.currentPresents[index] === value
    );
  }

  public getRemainingPresents() {
    let remainingPresents: number[] = [];
    for (let i = 0; i <= this.listedPresents.length - 1; i++) {
      const target = this.listedPresents[i];
      const current = this.currentPresents[i];

      remainingPresents.push(target - current);
    }

    return remainingPresents;
  }

  public calculateRemainingPresentsArea(presents: Present[]) {
    const remainingPresents = this.getRemainingPresents();
    let total = 0;
    for (let i = 0; i <= remainingPresents.length - 1; i++) {
      const count = remainingPresents[i];
      const present = presents[i];
      total += count * present.area;
    }

    return total;
  }

  public calculateEmptyArea(): number {
    return this.grid.findAll(EMPTY).length;
  }

  private setPresentFields(
    presentGrid: Grid,
    mountPosition: Position,
    symbol: string
  ) {
    for (const position of presentGrid) {
      if (presentGrid.get(position) === EMPTY) {
        continue;
      }

      this.grid.set(
        {
          x: mountPosition.x + position.x,
          y: mountPosition.y + position.y,
        },
        symbol
      );
    }
  }
}

function parseInput(filename: string) {
  const parts = readInput(filename, EOL.repeat(2));

  const presents = parts.slice(0, -1).map((presentStr) => {
    const [indexStr, ...areaStrings] = presentStr.split(EOL);

    return new Present(+indexStr[0], new Grid(areaStrings));
  });

  const regions = parts
    .slice(-1)[0]
    .split(EOL)
    .map((regionStr) => {
      const [dimensionsStr, listedPresentsString] = regionStr.split(": ");
      const [x, y] = dimensionsStr.split("x").map(Number);
      const listedPresents = listedPresentsString.split(" ").map(Number);

      return new Region(
        new Grid(Array(y).fill(EMPTY.repeat(x))),
        listedPresents
      );
    });

  return { presents, regions };
}

function dfs(
  region: Region,
  presents: Present[],
  seen = new Set<string>()
): boolean {
  if (region.isFilled()) {
    return true;
  }

  if (
    region.calculateEmptyArea() <
    region.calculateRemainingPresentsArea(presents)
  ) {
    return false;
  }

  for (const mountPosition of region.grid.findAll(EMPTY)) {
    const remainingPresents = region.getRemainingPresents();
    for (let i = 0; i <= remainingPresents.length - 1; i++) {
      const value = remainingPresents[i];
      if (value === 0) {
        continue;
      }

      const present = presents[i];
      if (!region.canAddPresent(present.grid, mountPosition)) {
        continue;
      }

      region.addPresent(present, mountPosition);

      const isFilled = dfs(region, presents, seen);
      if (isFilled) {
        return isFilled;
      }

      region.removePresent(present, mountPosition);
    }
  }

  return false;
}

export function part1(filename: string) {
  const { presents, regions } = parseInput(filename);

  let total = 0;
  for (const region of regions) {
    total += Number(dfs(region, presents));
  }

  return total;
}
