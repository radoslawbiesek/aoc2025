import { EOL } from "node:os";

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class GridIterator {
  private x = -1;
  private y = 0;
  private done = false;
  private readonly grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  next() {
    this.x++;
    const rows = this.grid.grid.length;
    const cols = this.grid.grid[0].length;

    if (this.x === cols && this.y === rows - 1) {
      this.done = true;
    } else if (this.x > cols - 1) {
      this.x = 0;
      this.y++;
    }

    return {
      done: this.done,
      value: {
        x: this.x,
        y: this.y,
      },
    };
  }
}

export class Grid {
  readonly grid: string[];
  readonly rows: number;
  readonly cols: number;

  constructor(grid: string[]) {
    this.grid = grid;
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;
  }

  public get({ x, y }: Position) {
    if (x > this.cols - 1 || y > this.rows - 1) {
      return null;
    }

    return this.grid[y][x];
  }

  public set({ x, y }: Position, value: string) {
    const row = this.grid[y];
    const updatedRow = row.substring(0, x) + value + row.substring(x + 1);
    this.grid[y] = updatedRow;
  }

  public findOne(value: string): Position | null {
    for (const pos of this) {
      if (this.get(pos) === value) {
        return pos;
      }
    }

    return null;
  }

  public findAll(value: string): Position[] {
    return [...this].filter((p) => this.get(p) === value);
  }

  public moveN({ x, y }: Position): Position | null {
    if (y === 0) {
      return null;
    }

    return { x, y: y - 1 };
  }

  public moveNW({ x, y }: Position): Position | null {
    if (y === 0 || x === 0) {
      return null;
    }

    return { x: x - 1, y: y - 1 };
  }

  public moveNE({ x, y }: Position): Position | null {
    if (y === 0 || x === this.cols - 1) {
      return null;
    }

    return { x: x + 1, y: y - 1 };
  }

  public moveW({ x, y }: Position): Position | null {
    if (x === 0) {
      return null;
    }

    return { x: x - 1, y };
  }

  public moveE({ x, y }: Position): Position | null {
    if (x === this.cols - 1) {
      return null;
    }

    return { x: x + 1, y };
  }

  public moveS({ x, y }: Position): Position | null {
    if (y === this.rows - 1) {
      return null;
    }

    return { x, y: y + 1 };
  }

  public moveSW({ x, y }: Position): Position | null {
    if (y === this.rows - 1 || x === 0) {
      return null;
    }

    return { x: x - 1, y: y + 1 };
  }

  public moveSE({ x, y }: Position): Position | null {
    if (y === this.rows - 1 || x === this.cols - 1) {
      return null;
    }

    return { x: x + 1, y: y + 1 };
  }

  public getNeighbors(position: Position): Position[] {
    return [
      this.moveN(position),
      this.moveNW(position),
      this.moveNE(position),
      this.moveW(position),
      this.moveE(position),
      this.moveS(position),
      this.moveSW(position),
      this.moveSE(position),
    ].filter((v) => !!v);
  }

  toString() {
    return this.grid.join(EOL);
  }

  clone() {
    return new Grid(structuredClone(this.grid));
  }

  [Symbol.iterator]() {
    return new GridIterator(this);
  }
}
