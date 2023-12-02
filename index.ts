import { part1, part2 } from "./day2/day"

const file = Bun.file('day2/input.txt');

const data = await file.text();

console.log(part1(data));
console.log(part2(data));