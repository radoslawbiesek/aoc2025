import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day05", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 3);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 513);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 14);
    });
    test("input", () => {
      assert.equal(part2("input.txt"), 339668510830757);
    });
  });
});
