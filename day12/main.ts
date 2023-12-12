const BROKEN = '#';
const WORKING = '.';

function parseInput(input: string): [string, number[]][] {
    return input.split('\n').map(line => {
        const [springs, numbers] = line.split(' ');
        return [
            springs,
            numbers.split(',').map(n => parseInt(n))
        ]
    })
}

function memoize<Args extends unknown[], Result>(
    fn: (...args: Args) => Result
): (...args: Args) => Result {
    const cache = new Map<string, Result>();
    return (...args: Args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };

}

const countWays = memoize((springs: string, numbers: number[]): number => {
    const sig: string = springs + ':' + numbers.join('');
    if (springs.length === 0) {
        if (numbers.length === 0) {
            return 1; // end of string and numbers - success!
        }
        // end of string but not numbers - we thought there'd be more broken ones!
        return 0;
    }
    if (numbers.length === 0) {
        // are there any more broken springs? we didn't expect that!
        for (const spring of springs) {
            if (spring === BROKEN) {
                return 0;
            }
        }
        return 1;
    }
    if (springs.length < numbers.reduce((a,b) => a+b, 0) + numbers.length - 1) {
        // not enough space for all the remaining expected broken springs!
        return 0;
    }
    if (springs[0] === WORKING) {
        // ignore the working spring
        return countWays(springs.slice(1), numbers);
    }
    if (springs[0] === BROKEN) {
        const [current, ...rest] = numbers;
        if (springs.slice(0, current).includes(WORKING)) {
            return 0; // not enough space for broken springs
        }
        if (springs[current] === BROKEN) { // too many broken springs
            return 0;
        }
        // it fits, proceed.
        return countWays(springs.slice(current+1), rest);
    }
    // UNKNOWN STATUS - fork
    return countWays(BROKEN + springs.slice(1), numbers)
         + countWays(WORKING + springs.slice(1), numbers);
    
});

export function part1(input: string): number {
    const lines = parseInput(input);
    let total = 0;
    for (const [springs, numbers] of lines) {
        total +=countWays(springs, numbers);
    }
    return total;
}

export function part2(input: string): number {
    const lines = parseInput(input);
    let total = 0;
    for (const [springs, numbers] of lines) {
        total += countWays(
            [springs, springs, springs, springs, springs].join('?'),
            [...numbers, ...numbers, ...numbers, ...numbers, ...numbers]
        );
    }
    return total;
}