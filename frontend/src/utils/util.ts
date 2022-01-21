import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { DragStyle } from './interfaces';

export const reorder = <T>(list: Array<T>, source: number, destination: number) => {
  const clone = Array.from(list);
  const [removed] = clone.splice(source, 1);
  clone.splice(destination, 0, removed);

  return clone;
};

export const wrapToError = (obj: unknown) =>
  new Error(`The following object was caught in a catch block: ${obj}`);

export function getStyle(snapshot: DraggableStateSnapshot, style?: DragStyle) {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: '0.1s',
  };
}
