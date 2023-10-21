'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'src/reducers/user';

const rootReducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
