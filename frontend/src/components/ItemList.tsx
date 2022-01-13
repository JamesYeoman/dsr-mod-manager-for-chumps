import React, { useReducer } from 'react';
import ItemCard from './ItemCard';

export interface ItemProps {
  id: string;
  content: string;
}

export interface ItemListProps {
  mods: ItemProps[];
}

type ReducerState = { id: string };
type ActionType = { type: string; id: string };
function reducer(state: ReducerState, action: ActionType): ReducerState {
  if (action.type !== 'selected') {
    throw new Error('Invalid action type!');
  }
  return { id: action.id };
}

// eslint-disable-next-line no-unused-vars
const dummyDispatch: React.Dispatch<ActionType> = (value: ActionType) => {};
export const SelectDispatch = React.createContext(dummyDispatch);

export default function ItemList({ mods }: ItemListProps) {
  const [selected, dispatch] = useReducer(reducer, { id: '' });

  return (
    <SelectDispatch.Provider value={dispatch}>
      {mods.map(({ id, content }, index) => (
        <ItemCard
          content={content}
          id={id}
          selected={selected.id === id}
          key={id}
          index={index}
        />
      ))}
    </SelectDispatch.Provider>
  );
}
