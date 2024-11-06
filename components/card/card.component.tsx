import Image from 'next/image';
import React from 'react';
import { Card } from '../../types/card.type';

interface CardProps {
  card: Card
}

const CardComponent = ({ card: { image, value, suit }}: CardProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={image} width={226} height={314} alt={`${value} of ${suit}`} className="w-24 h-auto rounded-lg shadow-lg" />
      <p className="text-center text-sm mt-2">{`${value} of ${suit}`}</p>
    </div>
  );
};

export default CardComponent;
