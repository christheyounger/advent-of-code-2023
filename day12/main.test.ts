import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./main";

describe("day", () => {
    const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
  describe("part 1", () => {
    test('returns 21', () => {
        expect(part1(input)).toEqual(21);
    })
  });
  describe("part 2", () => {
    test('returns 525152', () => {
        expect(part2(input)).toEqual(525152);
    })
  });
});
