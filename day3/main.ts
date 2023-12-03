type Position = [number, number];

function getCompleteNumber(pos: Position, grid: string[][]): string {
    let start, end;
  for (start = pos[1]; start >= 0 && !isNaN(parseInt(grid[pos[0]][start])); start--)
    console.log();
    for (end = pos[1]; end <= grid[0].length && !isNaN(parseInt(grid[pos[0]][end])); end++)
    console.log();
    let number: string = '';
    for (let i = start+1; i <= end-1; i++) {
        number = `${number}${grid[pos[0]][i]}`
    }
    return number;
}

function findPartNumbers(symbol: Position, grid: string[][]): number[] {
  const partNumbers: string[] = [];
  const positionsToTry: Position[] = [
    [symbol[0] - 1, symbol[1] - 1],
    [symbol[0] - 1, symbol[1]],
    [symbol[0] - 1, symbol[1] + 1],
    [symbol[0], symbol[1] + 1],
    [symbol[0] + 1, symbol[1] + 1],
    [symbol[0] + 1, symbol[1]],
    [symbol[0] + 1, symbol[1] - 1],
    [symbol[0], symbol[1] - 1],
  ];
  const numberPositions: Position[] = [];
  positionsToTry.forEach((position) => {
    const val = grid[position[0]][position[1]];
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(val ?? "")
    ) {
        if (numberPositions.some(p => (p[0] == position[0] && p[1] === (position[1] - 1))) ||
        numberPositions.some(p => (p[0] == position[0] && p[1] === (position[1] + 1)))) 
        {
            partNumbers.pop();
        }
      numberPositions.push(position);
      partNumbers.push(getCompleteNumber(position, grid));
    }
  });
  return partNumbers.map(n => parseInt(n));
}

export function part1(input: string): number {
  const grid = input.split("\n").map((line) => line.split(""));
  const symbols = "!@#$%^&*()-+_=/,<>?";
  const partLocations: Position[] = [];
  grid.forEach((line, lineNo) =>
    line.forEach((char, charNo) => {
      if (symbols.includes(char)) partLocations.push([lineNo, charNo]);
    })
  );
  const partNumbers = partLocations.map((loc) => findPartNumbers(loc, grid));
  return partNumbers.flat().reduce((prev, num) => prev + num, 0);
}

export function part2(input: string): number {
    const grid = input.split("\n").map((line) => line.split(""));
    const symbols = "*";
    const partLocations: Position[] = [];
    grid.forEach((line, lineNo) =>
      line.forEach((char, charNo) => {
        if (symbols.includes(char)) partLocations.push([lineNo, charNo]);
      })
    );
    const gears = partLocations.map((loc) => findPartNumbers(loc, grid));
    return gears.map(gear => gear.length > 1 ? gear.reduce((prev, num) => prev * num) : 0, 1).reduce((prev, num) => prev + num, 0);
}
