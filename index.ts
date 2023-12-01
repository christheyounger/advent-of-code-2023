import { day1 } from "./day1/day1"

const file = Bun.file('day1/input.txt');

const data = await file.text();

console.log(day1(data));