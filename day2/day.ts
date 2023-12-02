interface Configuration {
    red: number;
    green: number;
    blue: number;
}
const config1: Configuration = {
    red: 12,
    green: 13,
    blue: 14,
}
export function part1(input: string): number {
    const games = input.split('\n');
    const possibleGames = games.filter((game) => {
        const sets = game.split(': ')[1].split('; ');
        const possibleSets = sets.filter((set) => {
            const colors = set.split(', ');
            const possibleColors = colors.filter(string => {
                const [number, color] = string.split(' ', 2);
                if (!['red', 'green', 'blue'].includes(color)) return false;
                if (parseInt(number) > config1[color as 'red'|'green'|'blue']) return false;
                return true;
            });
            return possibleColors.length === colors.length
        });
        return possibleSets.length === sets.length;
    })
    return possibleGames.reduce((prev, next) => prev + parseInt(next.split(' ', 2)[1]), 0);
}

export function part2(input: string): number {
    const games = input.split('\n');
    return games.reduce((sum, game) => {
        const sets = game.split(': ')[1].split('; ');
        const minimums: {
            red: number,
            green: number,
            blue: number,
        } = sets.reduce((minimums, set) => {
            const result = {
                red: 0,
                green: 0,
                blue: 0,
            }
            const colors = set.split(', ');
            colors.forEach((string) => {
                const [number, color] = string.split(' ',2);
                if (color=='red') result.red = parseInt(number);
                if (color=='green') result.green = parseInt(number);
                if (color=='blue') result.blue = parseInt(number);
            })
            return {
                red: Math.max(minimums.red, result.red ?? 0),
                green: Math.max(minimums.green, result.green ?? 0),
                blue: Math.max(minimums.blue, result.blue ?? 0),
            }
        }, { red: 0, green: 0, blue: 0})
        return sum + minimums.red * minimums.green * minimums.blue;
    }, 0)
}