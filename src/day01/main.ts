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
    const rangeLength = this.end - this.start + 1;

    if (direction === "R") {
      const diff = this.position + distance;
      this.position = diff % rangeLength;
      this.startCount += Math.floor(diff / rangeLength);
    } else {
      const startPos = this.position;
      const diff = this.position - distance;
      this.position = (rangeLength + (diff % rangeLength)) % rangeLength;
      if (diff <= 0) {
        this.startCount +=
          Math.floor(Math.abs(diff / rangeLength)) +
          (startPos === this.start ? 0 : 1);
      }
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
