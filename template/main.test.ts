import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
  describe("part 1", () => {
    test('returns true', () => {
        expect(part1("")).toEqual(true);
    })
  });
  describe("part 2", () => {
    test('returns true', () => {
        expect(part2("")).toEqual(true);
    })
  });
});
