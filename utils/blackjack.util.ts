import { Card } from "../types/card.type";

export const calculateCardValue = (card: Card): number => {
  if (card?.value === 'ACE') {
    return 1
  };
  if (['KING', 'QUEEN', 'JACK'].includes(card?.value)) {
    return 10;
  };
  return parseInt(card?.value);
};

export const updateScore = (cards: Card[]): number => {
  return cards.reduce((total, card) => total + calculateCardValue(card), 0);
}
