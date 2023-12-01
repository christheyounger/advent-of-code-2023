
const match = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  const parseNumber = (number: string) => isNaN(number) ? match[number] : parseInt(number);
  const regex = /[0-9]|one|two|three|four|five|six|seven|eight|nine/g;
  const betterMatch = (input: string) => {
    const res = [];
    let m;
    while ((m = regex.exec(input))) {
      res.push(m[0]);
      regex.lastIndex = m.index + 1;
    }
    return res;
  }

export function day1(input: string): number {
  const lines = input.split("\n");
  const numbers = lines.map(betterMatch);
  const results = numbers.map((line: number[]) => {
    const start = parseNumber(line[0]);
    const end = parseNumber(line[line.length - 1]);
    return parseInt(`${start}${end}`);
  });
  return results.reduce((prev, next) => prev + next, 0);
}
