import { readInput } from "../utils.ts";

class Dial {
  public readonly start = 0;
  public readonly end = 99;
  public position = 50;
  public startCount = 0;

  private parseInstruction(instruction: string) {
    const direction = instruction[0];
    if (direction !== "L" && direction !== "R") {
      throw new Error(`Invalid direction: ${direction}`);
    }
    const distance = parseInt(instruction.slice(1));

    return { direction, distance };
  }

  public rotate(instruction: string): void {
    const { direction, distance } = this.parseInstruction(instruction);
    const step = direction === "R" ? 1 : -1;

    let distanceLeft = distance;
    while (distanceLeft > 0) {
      const newPosition = this.position + step;
      if (newPosition < this.start) {
        this.position = this.end;
      } else if (newPosition > this.end) {
        this.position = this.start;
      } else {
        this.position = newPosition;
      }

      if (this.position === this.start) {
        this.startCount++;
      }

      distanceLeft--;
    }
  }
}

export function part1(filename: string) {
  const instructions = readInput(filename);
  const dial = new Dial();
  let startCount = 0;

  for (const instruction of instructions) {
    dial.rotate(instruction);
    if (dial.position === dial.start) {
      startCount++;
    }
  }

  return startCount;
}

export function part2(filename: string) {
  const instructions = readInput(filename);
  const dial = new Dial();

  for (const instruction of instructions) {
    dial.rotate(instruction);
  }

  return dial.startCount;
}
