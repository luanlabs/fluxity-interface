import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IResponseToken } from 'src/constants/types';

export interface IToken extends IResponseToken {
  balance: string;
}

const initialState: IToken[] = [];

export const tokens = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    loadTokens: (_, action: PayloadAction<IToken[]>) => {
      return action.payload;
    },
    clearTokenBalances: (state) => {
      for (let i = 0; i < state.length; ++i) {
        state[i].balance = '0';
      }
    },
  },
});

export const { loadTokens } = tokens.actions;

export default tokens.reducer;
