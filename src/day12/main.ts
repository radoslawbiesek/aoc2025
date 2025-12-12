import { EOL } from "node:os";

import { readInput } from "../utils.ts";
import { Grid, Position } from "../grid.ts";

const SHAPE = "#";
const EMPTY = ".";

class Present {
  readonly index: number;
  readonly grid: Grid;
  readonly variants: Grid[];
  readonly area: number;

  constructor(index: number, grid: Grid) {
    this.index = index;
    this.grid = grid;
    this.area = this.grid.findAll(SHAPE).length;

    this.variants = this.getAllUniqueVariants(this.grid);
  }

  private getAllUniqueVariants(grid: Grid): Grid[] {
    const allVariants = [
      grid,
      this.flipVertically(grid),
      this.flipHorizontally(grid),
      this.rotate90(grid),
      this.rotate180(grid),
      this.rotate270(grid),
    ];

    const unique: Grid[] = [];

    for (const variant of allVariants) {
      if (unique.find((g) => g.toString() === variant.toString())) {
        continue;
      }

      unique.push(variant);
    }

    return unique;
  }

  private flipVertically(grid: Grid): Grid {
    return new Grid(grid.grid.toReversed());
  }

  private flipHorizontally(grid: Grid): Grid {
    return new Grid(grid.grid.map((row) => row.split("").reverse().join("")));
  }

  private rotate90(grid: Grid): Grid {
    const newGrid = new Grid(Array(grid.rows).fill(EMPTY.repeat(grid.cols)));

    for (const { x, y } of grid.findAll(SHAPE)) {
      newGrid.set({ x: y, y: newGrid.rows - 1 - x }, SHAPE);
    }

    return newGrid;
  }

  private rotate180(grid: Grid): Grid {
    return this.rotate90(this.rotate90(grid));
  }

  private rotate270(grid: Grid): Grid {
    return this.rotate90(this.rotate90(this.rotate90(grid)));
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

  public addPresent(
    presentIndex: number,
    presentGrid: Grid,
    mountPosition: Position
  ) {
    // const presentLetter =
    //   LETTERS[this.currentPresents.reduce((total, next) => next + total, 0)];
    this.setPresentFields(presentGrid, mountPosition, SHAPE);
    this.currentPresents[presentIndex]++;
  }

  public removePresent(
    presentIndex: number,
    presentGrid: Grid,
    mountPosition: Position
  ) {
    this.setPresentFields(presentGrid, mountPosition, EMPTY);
    this.currentPresents[presentIndex]--;
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

  get emptyArea(): number {
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

function calculateRemainingPresentsArea(
  remainingPresents: number[],
  presents: Present[]
) {
  let total = 0;
  for (let i = 0; i <= remainingPresents.length - 1; i++) {
    const count = remainingPresents[i];
    const present = presents[i];
    total += count * present.area;
  }

  return total;
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
    region.emptyArea <
    calculateRemainingPresentsArea(region.getRemainingPresents(), presents)
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
      for (const variant of present.variants) {
        if (!region.canAddPresent(variant, mountPosition)) {
          continue;
        }

        region.addPresent(i, variant, mountPosition);

        const isFilled = dfs(region, presents, seen);
        if (isFilled) {
          return isFilled;
        }

        region.removePresent(i, variant, mountPosition);
      }
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
