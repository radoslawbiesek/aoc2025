import { range, readInput } from "../utils.ts";

function parseRangeStr(rangeStr: string): [number, number] {
  const [startStr, endStr] = rangeStr.split("-");
  const start = parseInt(startStr);
  const end = parseInt(endStr);

  return [start, end];
}

function isInvalidId(str: string, numberOfSubstrings: number) {
  const substringLen = str.length / numberOfSubstrings;

  let prev: string | undefined;
  for (let i = 0; i < numberOfSubstrings; i++) {
    const current = str.substring(i * substringLen, (i + 1) * substringLen);
    if (prev && prev !== current) {
      return false;
    }
    prev = current;
  }

  return true;
}

export function part1(filename: string): number {
  const rangesStrings = readInput(filename, ",");
  let invalidIds = 0;

  for (const rangeStr of rangesStrings) {
    const [start, end] = parseRangeStr(rangeStr);
    for (let id = start; id <= end; id++) {
      const idStr = id.toString();
      if (idStr.length >= 2 && isInvalidId(idStr, 2)) {
        invalidIds += id;
      }
    }
  }

  return invalidIds;
}

export function part2(filename: string): number {
  let invalidIds = 0;

  for (const rangeStr of readInput(filename, ",")) {
    const [start, end] = parseRangeStr(rangeStr);
    for (let id = start; id <= end; id++) {
      const idStr = id.toString();
      const idLength = idStr.length;

      for (let s = 2; s <= idLength; s++) {
        if (idLength % s !== 0) {
          continue;
        }

        if (isInvalidId(idStr, s)) {
          invalidIds += id;
          break;
        }
      }
    }
  }

  return invalidIds;
}
