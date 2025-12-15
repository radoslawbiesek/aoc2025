import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day11", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 5);
    });
    test("input", () => {
      assert.equal(part1("input.txt"), 668);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input-part2.txt"), 2);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 294310962265680);
    });
  });
});
