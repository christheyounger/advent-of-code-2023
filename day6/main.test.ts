import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
    const input = `Time:      7  15   30
Distance:  9  40  200`;
  describe("part 1", () => {
    test('returns 288', () => {
        expect(part1(input)).toEqual(288);
    })
  });
  describe("part 2", () => {
    test('returns 71503', () => {
        expect(part2(input)).toEqual(71503);
    })
  });
});
