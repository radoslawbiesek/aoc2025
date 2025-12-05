import { readInput } from "../utils.ts";

type Bank = {
  allBatteries: string;
  currentBatteries: string;
  slotsLeft: number;
  nextIdx: number;
};

function findMaxJoltage(bank: Bank) {
  if (bank.slotsLeft === 0) {
    return;
  }

  const lastIdx = bank.allBatteries.length - bank.slotsLeft;
  let maxIdx = bank.nextIdx;
  for (let i = maxIdx + 1; i <= lastIdx; i++) {
    if (bank.allBatteries[i] > bank.allBatteries[maxIdx]) {
      maxIdx = i;
    }
  }

  bank.currentBatteries += bank.allBatteries[maxIdx];
  bank.nextIdx = maxIdx + 1;
  bank.slotsLeft--;

  findMaxJoltage(bank);
}

function solve(filename: string, maxBatteries: number) {
  const bankStrings = readInput(filename);
  let total = 0;

  for (const bankStr of bankStrings) {
    const bank: Bank = {
      currentBatteries: "",
      allBatteries: bankStr,
      slotsLeft: maxBatteries,
      nextIdx: 0,
    };

    findMaxJoltage(bank);

    total += parseInt(bank.currentBatteries);
  }

  return total;
}

export function part1(filename: string): number {
  return solve(filename, 2);
}

export function part2(filename: string): number {
  return solve(filename, 12);
}
