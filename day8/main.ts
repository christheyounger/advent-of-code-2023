type node = {
    left: string,
    right: string,
}
type Nodes = Record<string, node>;

function parseInput(input: string): [string[], Nodes] {
    const [directions, nodes] = input.split('\n\n');
    return [directions.split(''), nodes.split('\n').reduce((acc, node) => {
        const [name, children = ''] = node.split(' = ');
        const [left, right] = children.split(', ');
        acc[name] = { left: left.replace('(', ''), right: right.replace(')','') } as node;
        return acc;
    }, {} as Nodes)];
}

const getSteps = (nodeName: string, directions: string[], nodes: Nodes, end: (node: string) => boolean): number => {
    let step = 0;
    while (!end(nodeName)) {
        for (const direction of directions) {
            nodeName = getNextNode(nodeName, direction, nodes);
            step++;
        }
    }
    return step;
}

export function part1(input: string): number {
    const [directions, nodes] = parseInput(input);
    return getSteps('AAA', directions, nodes, (node) => node === 'ZZZ');
}

const getNextNode = (nodeName: string, direction: string, nodes: Nodes): string => {
    return direction === 'L' ? nodes[nodeName]?.left ?? nodeName : nodes[nodeName]?.right ?? nodeName;
};

export function part2(input: string): number {
    const [directions, nodes] = parseInput(input);
    let nodeNames = Object.keys(nodes).filter(n => n.match(`A$`));
    console.log(nodeNames);
    const steps = nodeNames.map(nodeName => getSteps(nodeName, directions, nodes, (node) => node[2] === 'Z'));
    return lowestCommonMultiple(steps);
}

function lowestCommonMultiple(arr: number[]): number {
  return arr.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}