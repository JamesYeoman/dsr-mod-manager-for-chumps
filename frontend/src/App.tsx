import React from 'react';
import ItemList from './ItemList';
import { isTauriContext } from './utils/tauri';
import './App.css';

export default function App() {
  if (!isTauriContext) {
    console.info('Tauri context not detected!');
    console.info('Dummy data will be used, which locks off some functionality!');
  }

  return (
    // See https://stackoverflow.com/a/47377149 for an explaination of this black magic...
    // I don't understand how, but it made the cards in the itemlist stop shrinking to all fit in the
    // itemlist, and instead properly overflow
    <div className="relative h-full">
      <div className="grid grid-cols-2 grid-rows-1 grid-flow-col gap-2 m-2 absolute top-0 left-0 right-0 bottom-0">
        <div className="section-card flex flex-col justify-start h-full min-h-max overflow-y-auto">
          <ItemList />
        </div>
        <div className="flex flex-col gap-2">
          <div className="section-card flex-1"></div>
          <div className="section-card flex-grow-0 flex-shrink-0 min-h-max grid grid-flow-row grid-cols-4 gap-0.5">
            <button className="btn btn-primary m-2">settings</button>
            <button className="btn btn-primary m-2">refresh</button>
            <button className="btn btn-primary m-2">inject</button>
            <button className="btn btn-primary m-2">play</button>
          </div>
        </div>
      </div>
    </div>
  );
}
