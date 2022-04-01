import type { AsyncThunkCfg, ErrorObj, ModFileData } from '../../utils/interfaces';
import type { ModInfo, ModsSliceState } from '../../utils/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DropResult } from 'react-beautiful-dnd';
import type { TreeNodeInArray } from 'react-simple-tree-menu';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';

import { isTauriContext, wrapTauriErr } from '../../utils/tauri';
import { unflattenFileData } from '../../utils/treeData';
import { reorder } from '../../utils/util';
import * as mocks from './mock/mods';

const defaultState: ModsSliceState = {
  list: [],
  loading: false,
  fileList: [{ key: 'root', label: 'No mod is selected' }],
};

// TODO: add support for file listings
export const modsSlice = createSlice({
  name: 'mods',
  initialState: defaultState,
  reducers: {
    setSelected: (state, action: PayloadAction<string | undefined>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<ModInfo[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadErr: (state, action: PayloadAction<ErrorObj>) => {
      state.loadErr = action.payload;
    },
    setFileInfo: (state, action: PayloadAction<TreeNodeInArray[]>) => {
      state.fileList = action.payload;
    },
  },
});

const { actions, reducer } = modsSlice;
const { setFileInfo } = actions;
export const { setList, setLoading, setLoadErr } = actions;
export default reducer;

export const refreshModList = createAsyncThunk<void, void, AsyncThunkCfg>(
  'mods/refreshModList',
  async (_unused, { dispatch, getState }) => {
    // Discards refresh events while a refresh is already happening
    if (getState().mods.loading) {
      return;
    }
    dispatch(setLoading(true));

    try {
      const data = isTauriContext
        ? await invoke<ModInfo[]>('get_mod_list')
        : mocks.mockModsList;
      dispatch(setList(data));
    } catch (e) {
      const err = wrapTauriErr(e) as ErrorObj;
      dispatch(setLoadErr(err));
    } finally {
      dispatch(setLoading(false));
    }
  },
);

const getFileData = async (id: string | undefined) => {
  if (!id) {
    return [{ path: 'root', filename: 'No mod is selected' }];
  }

  if (isTauriContext) {
    return await invoke<ModFileData[]>('get_file_list', { id });
  }

  if (Object.keys(mocks.fileData).some((key) => key === id)) {
    return mocks.fileData[id];
  } else {
    return [{ path: 'root', filename: `No mock data was found for ${id}` }];
  }
};

const getFileList = createAsyncThunk<void, void, AsyncThunkCfg>(
  'mods/_getFileList',
  async (_unused, { dispatch, getState }) => {
    const { selected: id } = getState().mods;
    const data: ModFileData[] = await getFileData(id);
    const unflattened = unflattenFileData(data, id ? id : 'root');
    dispatch(setFileInfo(unflattened));
  },
);

export const selectMod = createAsyncThunk<void, string, AsyncThunkCfg>(
  'mods/selectMod',
  async (id, { dispatch, getState }) => {
    const { selected: currID } = getState().mods;
    if (id === currID) {
      return;
    }

    dispatch(actions.setSelected(id));
    await dispatch(getFileList());
  },
);

export const handleDropCard = createAsyncThunk<void, DropResult, AsyncThunkCfg>(
  'mods/handleDropCard',
  async ({ source, destination }, { dispatch, getState }) => {
    if (!destination) {
      return;
    }

    const reordered = reorder(getState().mods.list, source.index, destination.index);
    dispatch(setList(reordered));

    //TODO: sync modlist order with tauri backend
  },
);
