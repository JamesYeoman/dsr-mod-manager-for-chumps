import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';

import modsSliceReducer from './slices/mods';
import settingsSliceReducer from './slices/settings';

const store = configureStore({
  reducer: {
    mods: modsSliceReducer,
    settings: settingsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void, Arg = void> = ThunkAction<
  ReturnType,
  RootState,
  Arg,
  AnyAction
>;

export default store;
