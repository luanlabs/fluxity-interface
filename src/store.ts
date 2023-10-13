'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userInfo from 'src/reducers/userInfo';

const rootReducer = combineReducers({
  userInfo,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
