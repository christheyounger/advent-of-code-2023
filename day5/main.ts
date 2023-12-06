type Map = {
  name: string;
  map: {
    source: number;
    destination: number;
    length: number;
  }[];
};

export function part1(input: string): number {
  const maps = createMaps(input);
  const [, ...seeds] = input.split("\n\n").shift()?.split(" ").map((s) => parseInt(s));
  const locations = getLocations(seeds, maps);
  return Math.min(...locations);
}

function getLocations(seeds: any[], maps: Map[]) {
  return seeds.map((seed) => {
    return maps.reduce((prev, map) => {
      let res = prev;
      map.map.forEach((map) => {
        if (
          res === prev &&
          map.source <= prev &&
          map.source + map.length >= prev
        ) {
          res = prev + map.destination - map.source;
        }
      });
      return res;
    }, seed);
  });
}

export function part2(input: string): number {
    const maps = createMaps(input).reverse();
    const [, ...seedNumbers] = input.split("\n\n").shift()?.split(" ").map((s) => parseInt(s));
    console.log(seedNumbers);
    for (let location=0; location < 1000000000; location++) {
        const seed = maps.reduce((prev, map) => {
            let res = prev;
            map.map.forEach(({source, destination, length}) => {
                if (res === prev && prev >= destination && prev <= destination + length -1)
                 res = prev - destination + source;
            });
            return res;
        }, location)
        for (let i = 0; i < seedNumbers.length; i += 2) {
            const length = parseInt(seedNumbers[i+1]);
            const start = parseInt(seedNumbers[i]);
            const end = start + length;
            if (seed >= start && seed <= end) {
                return location;
            }
        }
    }
    return 0;
}

function createMaps(input: string): Map[] {
  const maps = input.split("\n\n");
  maps.shift();
  return maps.map((string) => {
    const [name, ...parts] = string.split("\n");
    const map: Map = {
      name,
      map: parts.map((part) => {
        const [destination, source, length] = part
          .split(" ")
          .map((s) => parseInt(s));
        return { source, destination, length };
      }),
    };
    return map;
  });
}
