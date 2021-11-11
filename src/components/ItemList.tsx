import React from 'react';
import ItemCard, { ItemCardProps } from './ItemCard';
import '../styles/components/ItemList.scss';

export interface ItemListProps {
  data: ItemCardProps[];
}

export default function ItemList({ data }: ItemListProps) {
  return (
    <div className="item-list">
      {data.map((cardProps: ItemCardProps, index: number) => (
        <ItemCard {...cardProps} key={`card-${index + 1}`} />
      ))}
    </div>
  );
}
