import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
  describe("part 1", () => {
    test('returns 4361', () => {
        expect(part1(input)).toEqual(4361);
    })
  });
  describe("part 2", () => {
    test('returns 467835', () => {
        expect(part2(input)).toEqual(467835);
    })
  });
});
