import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
  describe("part 1", () => {
    test('returns 6', () => {
        expect(part1(input)).toEqual(6);
    })
  });
  describe("part 2", () => {
    test('returns 0', () => {
        expect(part2(input)).toEqual(0);
    })
  });
});
