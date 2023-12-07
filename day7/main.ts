type Kind = 'fiveOfAKind'|'fourOfAKind'|'fullHouse'|'threeOfAKind'|'twoPair'|'onePair'|'highCard'|undefined
type Hand = {
    value: string;
    bid: number;
    kind?: Kind;
    rank?: number;
}
const kinds: Kind[] = [
    'fiveOfAKind',
    'fourOfAKind',
    'fullHouse',
    'threeOfAKind',
    'twoPair',
    'onePair',
    'highCard'
];
function parseHands(input: string): Hand[] {
    return input.split('\n').map(hand => {
        const parts = hand.split(' ');
        return {
            value: parts[0],
            bid: parseInt(parts[parts.length-1]),
            kind: undefined,
            rank: undefined,
        }
    })
}

function getKind(value: string, jokers: boolean): Kind {
    const numbers: Record<string,number> = {};
    for (let i = 0; i < value.length; i++) {
        numbers[value[i]] = (numbers[value[i]] ?? 0) + 1
    }
    let ofAKind = Math.max(...Object.values(numbers));
    let pairs = Object.values(numbers).filter(n => n === 2).length;
    // Jokers rule 🫠
    if (jokers && numbers.J > 0 && numbers.J < 5) {
        const highestCard = Object.keys(numbers).reduce((highest, card) => {
            return numbers[card] > highest.number && card !=='J' ? { card, number: numbers[card] } : highest
        }, { card: '', number: 0 })
        numbers[highestCard.card] += numbers.J
        numbers.J = 0;
        ofAKind = Math.max(...Object.values(numbers));
        pairs = Object.values(numbers).filter(n => n === 2).length;
    }
    if (ofAKind === 5) return 'fiveOfAKind';
    if (ofAKind === 4) return 'fourOfAKind';
    if (ofAKind === 3 && pairs === 1) return 'fullHouse';
    if (ofAKind === 3) return 'threeOfAKind';
    if (pairs === 2) return 'twoPair';
    if (pairs === 1) return 'onePair';
    if (ofAKind === 1) return 'highCard';
}

const compareCards = (card1: string, card2: string, jokers: boolean) => {
    const rep = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        T: 10,
        J: jokers ? 1 : 11,
        Q: 12,
        K: 13,
        A: 14,
    }
    const val1 = rep[card1]??card1
    const val2 = rep[card2]??card1
    return val1 - val2;
}

const compareHands = (hand1: Hand, hand2: Hand, jokers = false): number => {
    if (hand1.kind === hand2.kind) {
        for (let i = 0; i < hand1.value.length; i++) {
            if (hand1.value[i] !== hand2.value[i]) {
                return compareCards(hand1.value[i], hand2.value[i], jokers)
            }
        }
        return 0;
    }
    for (let i = 0; i < kinds.length; i++) {
        if (hand1.kind === kinds[i]) return 1;
        if (hand2.kind === kinds[i]) return -1; 
    }
    return 0;
}

function main (input: string, jokers = false): number {
    const hands = parseHands(input);
    hands.forEach(h => {
        h.kind = getKind(h.value, jokers);
    })
    hands.sort((a, b) => compareHands(a, b, jokers));
    hands.forEach((h, i) => h.rank = i+1)
    return hands.reduce((t, h) => t + ((h.rank ?? 1) * h.bid), 0);
}

export function part1(input: string): number {
    return main(input)
}

export function part2(input: string): number {
    return main(input, true)
}