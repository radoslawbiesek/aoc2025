import { test } from "node:test";
import * as assert from "node:assert";

import { part1, part2 } from "./main.ts";

test("day01 - part1", () => {
  assert.equal(part1("test-input.txt"), 3);
  assert.equal(part1("input.txt"), 1182);
});

test("day01 - part2", () => {
  assert.equal(part2("test-input.txt"), 6);
  assert.equal(part2("input.txt"), 6907);
});
