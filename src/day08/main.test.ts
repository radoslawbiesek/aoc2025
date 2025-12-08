import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day08", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt", 10), 40);
    });
    test("input", () => {
      assert.equal(part1("input.txt", 1000), 66912);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 25272);
    });

    test("input", () => {
      assert.equal(part2("input.txt"), 724454082);
    });
  });
});
