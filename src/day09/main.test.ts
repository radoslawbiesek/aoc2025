import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day09", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 50);
    });
    test("input", () => {
      assert.equal(part1("input.txt"), 4715966250);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 24);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 1530527040);
    });
  });
});
