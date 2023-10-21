'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AccountResponse } from 'stellar-sdk';

interface IUser {
  address: string;
  info: AccountResponse | null;
}

const initialState: IUser = {
  address: '',
  info: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    loadAccount: (state, action: PayloadAction<AccountResponse | null>) => {
      state.info = action.payload;
    },
    disconnect: (state) => {
      state.info = null;
      state.address = '';
    },
  },
});

export const { setAddress, disconnect, loadAccount } = user.actions;

export default user.reducer;
