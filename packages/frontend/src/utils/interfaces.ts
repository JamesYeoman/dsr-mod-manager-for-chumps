import type { AppDispatch, RootState } from '../redux/store';
import type { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { TreeNodeInArray } from 'react-simple-tree-menu';

export interface ModInfo {
  id: string;
  content: string;
}

export interface ModFileData {
  path: string;
  filename: string;
}

export interface ModsSliceState {
  list: ModInfo[];
  selected?: string;
  loading: boolean;
  loadErr?: ErrorObj;
  fileList: TreeNodeInArray[];
}

export interface FolderLocation {
  old: string;
  new: string;
}

export interface SettingsSliceState {
  modsLocation: FolderLocation;
  gameLocation: FolderLocation;
  isRunningTauriCmd: boolean;
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

export interface TauriError {
  message: string;
}

export type DragStyle = DraggingStyle | NotDraggingStyle;
