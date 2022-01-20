import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { AppDispatch, RootState } from '../redux/store';

export interface ModInfo {
  id: string;
  content: string;
}

export interface ModsSliceState {
  list: ModInfo[];
  selected?: string;
  loading: boolean;
  loadErr?: ErrorObj;
}

export interface ErrorObj {
  name: string;
  message: string;
  stack?: string;
}

export interface AsyncThunkCfg {
  dispatch: AppDispatch;
  state: RootState;
}
export type DragStyle = DraggingStyle | NotDraggingStyle;
