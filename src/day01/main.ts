import { readInput } from "../utils.ts";

class Dial {
  readonly start = 0;
  readonly end = 99;
  position = 50;
  startCount = 0;

  rotate(direction: "L" | "R", distance: number): void {
    let distanceLeft = distance;

    while (distanceLeft > 0) {
      if (direction === "L") {
        this.position--;
        if (this.position < this.start) {
          this.position = this.end;
        }
      } else {
        this.position++;
        if (this.position > this.end) {
          this.position = this.start;
        }
      }
      if (this.position === this.start) {
        this.startCount++;
      }

      distanceLeft--;
    }
  }
}

function parseLine(line: string): { direction: "R" | "L"; distance: number } {
  const direction = line[0];
  if (direction !== "L" && direction !== "R") {
    throw new Error(`Invalid direction: ${direction}`);
  }
  const distance = parseInt(line.slice(1));

  return { direction, distance };
}

function getLines(filename: string) {
  const input = readInput(filename);

  return input.map(parseLine);
}

export function part1(path: string) {
  const lines = getLines(path);
  const dial = new Dial();
  let startCount = 0;

  for (const { direction, distance } of lines) {
    dial.rotate(direction, distance);
    if (dial.position === dial.start) {
      startCount++;
    }
  }

  return startCount;
}

export function part2(filename: string) {
  const lines = getLines(filename);
  const dial = new Dial();

  for (const { direction, distance } of lines) {
    dial.rotate(direction, distance);
  }

  return dial.startCount;
}
