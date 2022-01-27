import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';
import { SettingsSliceState } from '../../utils/interfaces';
import { isTauriContext } from '../../utils/tauri';
import { wrapToErrObj } from '../../utils/util';
import { AppDispatch } from '../store';

const defaultVal = isTauriContext ? '' : 'Unavailable. Not running in tauri';

const defaultState: SettingsSliceState = {
  gameLocation: {
    old: defaultVal,
    new: '',
  },
  modsLocation: {
    old: defaultVal,
    new: '',
  },
  isRunningTauriCmd: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultState,
  reducers: {
    setGameFolder: (state, action: PayloadAction<string>) => {
      state.gameLocation.old = action.payload;
    },
    setNewGameFolder: (state, action: PayloadAction<string>) => {
      state.gameLocation.new = action.payload;
    },
    setNewModsFolder: (state, action: PayloadAction<string>) => {
      state.modsLocation.new = action.payload;
    },
    setModsFolder: (state, action: PayloadAction<string>) => {
      state.modsLocation.old = action.payload;
    },
    toggleIsRunningTauriCmd: (state) => {
      state.isRunningTauriCmd = !state.isRunningTauriCmd;
    },
  },
});

const { actions, reducer } = settingsSlice;
const { setNewGameFolder, toggleIsRunningTauriCmd, setNewModsFolder } = actions;
export const { setModsFolder, setGameFolder } = actions;
export default reducer;

export const pickGameLocation = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'settings/pickGameLocation',
  async (_unused, { dispatch }) => {
    if (!isTauriContext) {
      return;
    }
    dispatch(toggleIsRunningTauriCmd());

    try {
      const data = await invoke<string>('request_game_location');
      dispatch(setNewGameFolder(data));
    } catch (e) {
      const err = wrapToErrObj(e);
      alert(err);
    } finally {
      dispatch(toggleIsRunningTauriCmd());
    }
  },
);

export const pickModsLocation = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'settings/pickModsLocation',
  async (_unused, { dispatch }) => {
    if (!isTauriContext) {
      return;
    }
    dispatch(toggleIsRunningTauriCmd());

    try {
      const data = await invoke<string>('request_mods_location');
      dispatch(setNewModsFolder(data));
    } catch (e) {
      const err = wrapToErrObj(e);
      alert(err);
    } finally {
      dispatch(toggleIsRunningTauriCmd());
    }
  },
);
