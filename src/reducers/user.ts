'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AccountResponse } from 'stellar-sdk';

interface IUser {
  address: string;
  info: AccountResponse | null;
  loading: boolean;
  hasReceivedTokens: boolean;
}

const initialState: IUser = {
  address: '',
  info: null,
  loading: true,
  hasReceivedTokens: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.loading = true;
    },
    loadAccount: (state, action: PayloadAction<AccountResponse | null>) => {
      state.info = action.payload;
      state.loading = false;
    },
    disconnect: (state) => {
      state.info = null;
      state.address = '';
      state.loading = true;
      state.hasReceivedTokens = false;
    },
    hasTestnetTokens: (state) => {
      state.hasReceivedTokens = true;
      state.loading = false;
    },
  },
});

export const { setAddress, disconnect, loadAccount, hasTestnetTokens } = user.actions;

export default user.reducer;
