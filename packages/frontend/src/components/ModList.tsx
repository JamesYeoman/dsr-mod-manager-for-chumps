import type { RootState } from '../redux/store';

import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { selectMod } from '../redux/slices/mods';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getStyle } from '../utils/util';

const selector = (state: RootState) => {
  const { list, loading, loadErr, selected } = state.mods;
  return { list, loading, loadErr, selected };
};

export default function ModList() {
  const dispatch = useAppDispatch();
  const { list, loading, loadErr, selected } = useAppSelector(selector);
  const onSelect = useCallback((id: string) => () => dispatch(selectMod(id)), [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadErr) {
    return <div>Error: {JSON.stringify(loadErr)}</div>;
  }

  return (
    <React.Fragment>
      {list.map(({ id, content }, index) => (
        <Draggable key={id} draggableId={id} index={index}>
          {(provided, snapshot) => {
            const { innerRef, draggableProps, dragHandleProps } = provided;
            const baseProps = {
              ...draggableProps,
              ...dragHandleProps,
              tabIndex: 1,
              style: getStyle(snapshot, draggableProps.style),
              onDoubleClick: onSelect(id),
              'data-selected': selected === id,
            };

            return (
              <div className="modCard" ref={innerRef} {...baseProps}>
                {content}
              </div>
            );
          }}
        </Draggable>
      ))}
    </React.Fragment>
  );
}
