import type { AsyncThunkCfg, SettingsSliceState } from '../../utils/interfaces';
import type { AppDispatch } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';

import { isTauriContext, tauriErrHandler } from '../../utils/tauri';

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
    //TODO: use this flag to detect race conditions
    dispatch(toggleIsRunningTauriCmd());

    try {
      const data = await invoke<string>('request_game_location');
      dispatch(setNewGameFolder(data));
    } catch (e) {
      tauriErrHandler(e);
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
      tauriErrHandler(e);
    } finally {
      dispatch(toggleIsRunningTauriCmd());
    }
  },
);

export const settingsCancel = createAsyncThunk<void, void, AsyncThunkCfg>(
  'settings/cancel',
  async (_unused, { dispatch, getState }) => {
    const { gameLocation, modsLocation } = getState().settings;

    try {
      if (isTauriContext) {
        await invoke<string>('discard_settings');
      }

      if (gameLocation.new.length > 0) {
        dispatch(setNewGameFolder(''));
      }

      if (modsLocation.new.length > 0) {
        dispatch(setNewModsFolder(''));
      }
    } catch (e) {
      tauriErrHandler(e);
    }
  },
);

export const settingsSave = createAsyncThunk<void, void, AsyncThunkCfg>(
  'settings/save',
  async (_unused, { dispatch, getState }) => {
    const { gameLocation, modsLocation } = getState().settings;

    try {
      if (isTauriContext) {
        await invoke<string>('save_settings');
      }

      if (gameLocation.new.length > 0) {
        dispatch(setGameFolder(gameLocation.new));
        dispatch(setNewGameFolder(''));
      }

      if (modsLocation.new.length > 0) {
        dispatch(setModsFolder(modsLocation.new));
        dispatch(setNewModsFolder(''));
      }
    } catch (e) {
      tauriErrHandler(e);
    }
  },
);
