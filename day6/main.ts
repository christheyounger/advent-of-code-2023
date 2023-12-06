type Race = {
    time: number;
    distance: number;
}
function parseInput(input:string): Race[] {
    const [time, distance] = input.split('\n');
    const [, timeString] = time.split(': ');
    const [, distanceString] = distance.split(': ');
    const times = timeString.split(' ').map(str => parseInt(str.trim())).filter(s => !isNaN(s));
    const distances = distanceString.split(' ').map(str => parseInt(str.trim())).filter(s => !isNaN(s));
    return times.map((time, i) => ({ time, distance: distances[i] }));
}
const waysToWin = (race:Race) => [...Array(race.time).keys()].filter(time => (race.time -time) * time > race.distance).length;
export function part1(input: string): number {
    return parseInput(input).reduce((total, race) => {
        return total * waysToWin(race);
    }, 1);
}
export function part2(input: string): number {
    const races = parseInput(input);
    const race: Race = {
        time: parseInt(races.reduce((total, race) => `${total}${race.time}`, '')),
        distance: parseInt(races.reduce((total, race) => `${total}${race.distance}`, '')),
    }
    console.log(race);
    return waysToWin(race);
}
