import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import modsSliceReducer from './slices/mods';

const store = configureStore({
  reducer: {
    mods: modsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
