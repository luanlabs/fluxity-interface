'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'src/reducers/user';
import tokens from 'src/reducers/tokens';

const rootReducer = combineReducers({
  user,
  tokens,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
