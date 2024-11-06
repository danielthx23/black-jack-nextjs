import React from 'react';
import CardComponent from '@/components/card/card.component';
import { Card } from '@/types/card.type';

interface HandProps {
  cards: Card[];
  score: number;
  title: string;
}

const Hand = ({ cards, score, title }: HandProps) => (
  <div className="max-w-md mx-auto border border-gray-300 rounded-lg p-4 shadow-md">
    <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
    <div className="flex flex-wrap justify-center gap-2">
      {cards.map((card, index) => (
        <CardComponent key={index} card={card} />
      ))}
    </div>
    <p className="mt-2 text-center">Pontuação: {score}</p>
  </div>
);

export default Hand;
