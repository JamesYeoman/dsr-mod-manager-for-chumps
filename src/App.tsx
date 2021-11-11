import React from 'react';
import ItemList, { ItemListProps } from './components/ItemList';
import './styles/App.css';

const dummyData: ItemListProps = {
  data: [
    { content: 'This is an item' },
    { content: 'This is another item' },
    { content: 'This is a third item' },
    { content: 'This is fourth item' },
    { content: 'This is another item' },
    { content: 'This is another item', selected: true },
    { content: 'This is another item' },
    { content: 'This is another item' },
  ],
};

export default function App() {
  return (
    <div className="root-grid">
      <ItemList {...dummyData} />
      <div className="flex flex-1 flex-col h-full"></div>
    </div>
  );
}
