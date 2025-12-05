import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

describe("day02", () => {
  describe("part1", () => {
    test("test input", () => {
      assert.equal(part1("test-input.txt"), 1227775554);
    });

    test("input", () => {
      assert.equal(part1("input.txt"), 20223751480);
    });
  });

  describe("part2", () => {
    test("test input", () => {
      assert.equal(part2("test-input.txt"), 4174379265);
    });
    test("input", () => {
      assert.equal(part2("input.txt"), 30260171216);
    });
  });
});
