'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserInfo {
  address: string;
}

const initialState: IUserInfo = {
  address: '',
};

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    removeAddress: (state) => {
      state.address = '';
    },
  },
});

export const { setAddress, removeAddress } = userInfo.actions;

export default userInfo.reducer;
