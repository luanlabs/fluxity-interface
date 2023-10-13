'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
};

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});
export const { setAddress } = userInfo.actions;

export default userInfo.reducer;
