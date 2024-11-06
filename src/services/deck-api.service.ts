import { DeckResponse, DrawCardResponse } from "@/types/deck.type";
import { Card } from "@/types/card.type";

const getApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_DECK_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_DECK_API_URL is not defined");
  }
  return url;
};

export async function getDeckAndSuffle(): Promise<DeckResponse> {
  const response = await fetch(`${getApiUrl()}/deck/new/shuffle`);
  return await response.json();
}

export async function drawCards(deckId: string, count: number): Promise<Card[]> {
  const res = await fetch(`${getApiUrl()}/deck/${deckId}/draw/?count=${count}`);
  const data: DrawCardResponse = await res.json();
  return data.cards;
}