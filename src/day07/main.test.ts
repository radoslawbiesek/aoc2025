import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day07", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 21);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 1560);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 40);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 25592971184998);
    });
  });
});
