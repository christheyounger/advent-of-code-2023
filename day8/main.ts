type node = {
    name: string,
    left: string,
    right: string,
}

function parseInput(input: string): [string[], node[]] {
    const [directions, nodes] = input.split('\n\n');
    return [directions.split(''), nodes.split('\n').map(node => {
        const [name, children = ''] = node.split(' = ');
        const [left, right] = children.split(', ');
        return { name, left: left.replace('(', ''), right: right.replace(')','') }
    })];
}


export function part1(input: string): number {
    const [directions, nodes] = parseInput(input);
    let step = 0, nodeName = 'AAA';
    while (nodeName !== 'ZZZ') {
        for (const direction of directions) {
            if (direction === 'L') {
                nodeName = nodes.find(node => node.name === nodeName)?.left ?? nodeName;
            } else if (direction === 'R') {
                nodeName = nodes.find(node => node.name === nodeName)?.right ?? nodeName;
            }
            step++;
        }
    }
    return step;
}

export function part2(input: string): number {
    return 0;
}