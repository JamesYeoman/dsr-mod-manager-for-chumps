import React from 'react';
import classnames from 'classnames';
import '../styles/components/ItemCard.css';

export interface ItemCardProps {
  content: string;
  selected?: boolean;
}

const ItemCard = ({ content, selected }: ItemCardProps) => {
  const classNames = classnames({ 'item-card': true, selected });
  return <div className={classNames}>{content}</div>;
};

export default ItemCard;
