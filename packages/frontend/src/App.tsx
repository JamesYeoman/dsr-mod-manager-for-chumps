import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ActionButtons from './components/ActionButtons';
import InfoPane from './components/InfoPane';
import ModList from './components/ModList';
import { handleDropCard, refreshModList } from './redux/slices/mods';
import { useAppDispatch } from './utils/hooks';
import { isTauriContext } from './utils/tauri';

//TODO=========================================================================
//TODO=========================================================================
//TODO== Create a resizable panel component                                  ==
//TODO== Ref: https://blog.theodo.com/2020/11/react-resizeable-split-panels/ ==
//TODO=========================================================================
//TODO=========================================================================

//* At very small window sizes, dragging to the bottom of the list will glitch out.
//* However, in the react storybooks for react-beautiful-dnd, the same glitching doesn't happen...
//? What is different between this code and the code used for the storybooks
//? that would cause this glitching behaviour?
const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isTauriContext) {
      console.info('Tauri context not detected!');
      console.info('Dummy data will be used, which locks off some functionality!');
    }
    dispatch(refreshModList());
  }, []); // onComponentMount

  return (
    <div className="root__grid">
      <DragDropContext onDragEnd={(dropResult) => dispatch(handleDropCard(dropResult))}>
        <Droppable droppableId="modList">
          {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => {
            const listProps = { ref: innerRef, 'data-dragging-over': isDraggingOver };

            return (
              <div className="mod-list" {...droppableProps} {...listProps}>
                <ModList />
                {placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div className="info-pane">
        <InfoPane />
        <ActionButtons />
      </div>
    </div>
  );
};

export default App;
