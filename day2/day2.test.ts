import { part1, part2 } from "./day";

describe('day 2', () => {
    const input1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    test('it should return 8', () => {
        expect(part1(input1)).toEqual(8);
    })

    test('part 2 should return 2286', () => {
        expect(part2(input1)).toEqual(2286);
    })
})