import { test, describe } from "node:test";
import * as assert from "node:assert";

import { part1 } from "./main.ts";

describe("day12", () => {
  describe("part1", () => {
    // test("test input", () => {
    //   assert.equal(part1("test-input.txt"), 2);
    // });

    test("input", () => {
      assert.equal(part1("input.txt"), 414);
    });
  });
});
