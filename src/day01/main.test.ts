import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day01", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 3);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 1182);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 6);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 6907);
    });
  });
});
