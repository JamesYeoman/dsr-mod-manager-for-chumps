import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';
import { AsyncThunkCfg, ErrorObj, ModInfo, ModsSliceState } from '../../utils/interfaces';
import { isTauriContext } from '../../utils/tauri';
import { reorder, wrapToError } from '../../utils/util';
import { DropResult } from 'react-beautiful-dnd';

const defaultState: ModsSliceState = {
  list: [],
  loading: false,
};

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
  },
});

const { actions, reducer } = modsSlice;
export const { setSelected, setList, setLoading, setLoadErr } = actions;
export default reducer;

const mockData: ModInfo[] = [
  { content: 'This is a dummy mod', id: 'mod-0' },
  { content: 'This is another dummy mod', id: 'mod-1' },
  { content: 'This is a third dummy mod', id: 'mod-2' },
  { content: 'This is a fourth, selected dummy mod', id: 'mod-3' },
  { content: 'This is a fifth dummy mod', id: 'mod-4' },
];

export const refreshModList = createAsyncThunk<void, void, AsyncThunkCfg>(
  'mods/refreshModList',
  async (_unused, { dispatch, getState }) => {
    // Discards refresh events while a refresh is already happening
    if (getState().mods.loading) {
      return;
    }
    dispatch(setLoading(true));

    try {
      const data = isTauriContext ? await invoke<ModInfo[]>('get_mod_list') : mockData;
      dispatch(setList(data));
    } catch (e) {
      const err = e instanceof Error ? e : wrapToError(e);
      dispatch(setLoadErr({ ...(err as ErrorObj) }));
    } finally {
      dispatch(setLoading(false));
    }
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
