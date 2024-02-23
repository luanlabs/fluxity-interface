'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStreamHistory } from 'src/constants/types';
import { AccountResponse } from 'stellar-sdk/lib/horizon';

interface IUser {
  address: string;
  info: AccountResponse | null;
  loading: boolean;
  hasReceivedTokens: boolean;
  history: IStreamHistory[];
  loadingHistory: boolean;
}

const initialState: IUser = {
  address: '',
  info: null,
  loading: true,
  hasReceivedTokens: false,
  history: [],
  loadingHistory: true,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.loading = true;
      state.loadingHistory = true;
    },
    loadAccount: (state, action: PayloadAction<AccountResponse | null>) => {
      state.info = action.payload;
      state.loading = false;
    },
    disconnect: (state) => {
      state.info = null;
      state.address = '';
      state.loading = true;
      state.history = [];
      state.hasReceivedTokens = false;
    },
    hasTestnetTokens: (state) => {
      state.hasReceivedTokens = true;
      state.loading = false;
    },
    loadStreamHistory: (state, action: PayloadAction<IStreamHistory[]>) => {
      state.history = action.payload;
      state.loadingHistory = false;
    },
  },
});

export const { setAddress, disconnect, loadAccount, hasTestnetTokens, loadStreamHistory } =
  user.actions;

export default user.reducer;
