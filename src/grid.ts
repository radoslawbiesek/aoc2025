type Position = { x: number; y: number };
type Cell = Position & { value: string };

export class Grid {
  private readonly grid: string[];
  constructor(grid: string[]) {
    this.grid = grid;
  }

  public get({ x, y }: Position) {
    return this.grid[y][x];
  }

  public set({ x, y }: Position, value: string) {
    const row = this.grid[y];
    const updatedRow = row.substring(0, x) + value + row.substring(x + 1);
    this.grid[y] = updatedRow;
  }

  public getNeighbors({ x, y }: Position): Cell[] {
    return [
      { x, y: y - 1, value: this.grid[y - 1]?.[x] }, // N
      { x: x - 1, y: y - 1, value: this.grid[y - 1]?.[x - 1] }, // NW
      { x: x + 1, y: y - 1, value: this.grid[y - 1]?.[x + 1] }, // NE
      { x: x - 1, y, value: this.grid[y][x - 1] }, // W
      { x: x + 1, y, value: this.grid[y][x + 1] }, // E
      { x, y: y + 1, value: this.grid[y + 1]?.[x] }, // S
      { x: x - 1, y: y + 1, value: this.grid[y + 1]?.[x - 1] }, // SW
      { x: x + 1, y: y + 1, value: this.grid[y + 1]?.[x + 1] }, // SE
    ].filter(({ value }) => typeof value === "string");
  }

  [Symbol.iterator]() {
    const rows = this.grid.length;
    const cols = this.grid[0].length;
    return {
      current: { x: -1, y: 0 },
      next() {
        this.current.x++;

        if (this.current.x === cols && this.current.y === rows - 1) {
          return {
            done: true,
            // unreachable placeholder for type consistency
            value: {
              x: Infinity,
              y: Infinity,
            },
          };
        }

        if (this.current.x > cols - 1) {
          this.current.x = 0;
          this.current.y++;
        }

        return {
          done: false,
          value: {
            x: this.current.x,
            y: this.current.y,
          },
        };
      },
    };
  }
}
