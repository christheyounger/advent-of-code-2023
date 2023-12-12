import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
  describe("part 1", () => {
    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
    test('returns 6', () => {
        expect(part1(input)).toEqual(6);
    })
  });
  describe("part 2", () => {
    const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
    test('returns 6', () => {
        expect(part2(input)).toEqual(6);
    })
  });
});
