'use client';

import { AccountResponse } from '@stellar/stellar-sdk/lib/horizon';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Testnet } from 'src/constants/networks';
import { IStreamHistory } from 'src/constants/types';
import { StellarConfig } from 'src/models';

interface IUser {
  address: string;
  info: AccountResponse | null;
  loading: boolean;
  hasReceivedTokens: boolean;
  history: IStreamHistory[];
  loadingHistory: boolean;
  network: StellarConfig;
}

const initialState: IUser = {
  address: '',
  info: null,
  loading: true,
  hasReceivedTokens: false,
  history: [],
  loadingHistory: true,
  network: Testnet,
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
    setNetwork: (state, action: PayloadAction<StellarConfig>) => {
      state.network = action.payload;
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

export const {
  setAddress,
  disconnect,
  setNetwork,
  loadAccount,
  hasTestnetTokens,
  loadStreamHistory,
} = user.actions;

export default user.reducer;
