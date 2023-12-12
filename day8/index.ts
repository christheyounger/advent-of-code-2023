import { part1, part2 } from "./main";


const file = Bun.file('./input.txt');
const input = await file.text();

console.log(part1(input))
console.log(part2(input))