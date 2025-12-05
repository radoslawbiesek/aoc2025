import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day04", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 13);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 1518);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 43);
    });
    test("input", () => {
      assert.equal(part2("input.txt"), 8665);
    });
  });
});
