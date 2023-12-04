type Card = {
    number: number;
    winners: number[],
    youHave: number[],
    won: number[],
    processed: boolean,
}

const parseCards = function(input: string): Card[] {
    return input.split(`\n`).map(card => {
        const [cardName, numbers] = card.split(':');
        const [winners,youHave] = numbers.split('|')
        return {
            number: parseInt(cardName.split('d ')[1]),
            winners: winners.trim().split(' ').map(n => parseInt(n)),
            youHave: youHave.trim().split(' ').map(n => parseInt(n)),
            won: [],
            processed: false,
        }
    })
}

const youHaveOne = (card: Card) => card.youHave.filter(n => !isNaN(n) && card.winners.includes(n))

export function part1(input: string): number {
    const cards = parseCards(input);
    return cards.reduce((total, card) => {
        card.won = youHaveOne(card);
        let cardVal = card.won.length > 0 ? 1 : 0;
        if (card.won.length > 1) {
            for (let i=1; i< card.won.length; i++) {
                cardVal *= 2;
            }
        }
        card.processed = true;
        return total + cardVal;
    }, 0)
}

const getCardsWon = (card: Card, cards: Card[], index: number): Card[] => {
    card.won = youHaveOne(card);
    const wonCards = cards.slice(index, index+card.won.length).map(c => ({
        ...c,
        processed: false,
    }));
    return wonCards;
}

export function part2(input: string): number {
    const cards = parseCards(input);
    while (cards.some(c => c.processed === false)) {
        cards.filter(c => !c.processed).forEach((card) => {
            const won = getCardsWon(card, cards, card.number);
            card.processed = true;
            cards.push(...won);
        })
    }
    return cards.length;
}