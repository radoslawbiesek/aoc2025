import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day06", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 4277556);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 6209956042374);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 3263827);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 12608160008022);
    });
  });
});
