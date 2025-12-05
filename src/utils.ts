import * as fs from "node:fs";
import { EOL } from "node:os";
import * as path from "node:path";

export function readInput(filename: string, separator = EOL) {
  const content = fs.readFileSync(path.resolve(filename), {
    encoding: "utf-8",
  });

  return content.split(separator);
}

export function range(start: number, end: number): number[] {
  let r: number[] = [];
  for (let i = start; i <= end; i++) {
    r.push(i);
  }

  return r;
}
