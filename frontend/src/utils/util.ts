import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { DragStyle, ErrorObj } from './interfaces';

export const reorder = <T>(list: Array<T>, source: number, destination: number) => {
  const clone = Array.from(list);
  const [removed] = clone.splice(source, 1);
  clone.splice(destination, 0, removed);

  return clone;
};

const wrapToError = (obj: unknown) => {
  if (obj instanceof Error) {
    return obj;
  }

  return new Error(`The following object was caught in a catch block: ${obj}`);
};

export const wrapToErrObj = (obj: unknown) => {
  if (obj instanceof Error) {
    return obj as ErrorObj;
  }

  return wrapToError(obj) as ErrorObj;
};

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
