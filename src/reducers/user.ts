'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStreamHistory } from 'src/constants/types';

interface IUser {
  history: IStreamHistory[];
  loadingHistory: boolean;
}

const initialState: IUser = {
  history: [],
  loadingHistory: true,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoadingStreamHistory: (state) => {
      state.history = [];
      state.loadingHistory = true;
    },
    clearStreamHistory: (state) => {
      state.history = [];
      state.loadingHistory = false;
    },
    loadStreamHistory: (state, action: PayloadAction<IStreamHistory[]>) => {
      state.history = action.payload;
      state.loadingHistory = false;
    },
  },
});

export const { startLoadingStreamHistory, clearStreamHistory, loadStreamHistory } = user.actions;

export default user.reducer;
