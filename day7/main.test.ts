import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
    const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
  describe("part 1", () => {
    test('returns 6440', () => {
        expect(part1(input)).toEqual(6440);
    })
  });
  describe("part 2", () => {
    test('returns 5905', () => {
        expect(part2(input)).toEqual(5905);
    })
  });
});
