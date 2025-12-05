import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day03", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 357);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 17278);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 3121910778619);
    });
    test("input", () => {
      assert.equal(part2("input.txt"), 171528556468625);
    });
  });
});
