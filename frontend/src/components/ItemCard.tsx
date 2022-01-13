import React, { useContext } from 'react';
import cx from 'classnames';
import { SelectDispatch } from './ItemList';
import { Draggable } from 'react-beautiful-dnd';

export interface ItemCardProps {
  id: string;
  content: string;
  selected: boolean;
  index: number;
}

export default function ItemCard({ content, id, selected, index }: ItemCardProps) {
  const dispatch = useContext(SelectDispatch);

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={id}
          tabIndex={1}
          onDoubleClick={() => dispatch({ type: 'selected', id })}
          className={cx(
            'soft-corners bg-base-100 m-1 h-10 shrink-0 leading-10 outline-none select-none card-text',
            {
              'bg-mod-card-selected text-black': selected,
            },
          )}>
          {content}
        </div>
      )}
    </Draggable>
  );
}
